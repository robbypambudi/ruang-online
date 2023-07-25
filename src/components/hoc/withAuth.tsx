import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

import api from '@/lib/axios';
import { getToken, removeToken } from '@/lib/cookies';

import { showToast, WARNING_TOAST } from '@/components/DismissableToast';
import Loading from '@/components/Loading';

import useAuthStore from '@/store/useAuthStore';

import { ApiResponse } from '@/types/api';
import { PermissionsList } from '@/types/entities/permission-list';
import { MeResponse, User } from '@/types/entities/user';

export interface WithAuthProps {
  user: User;
}

type GeneralPermission = 'ADMIN' | 'USER' | 'auth';

const hasPermission = (user: User | null, permission: PermissionsList) => {
  return permission.every((p) => user?.permissions?.includes(p));
};

const ADMIN_ROUTE = '/admin';
const USER_ROUTE = '/dashboard';
const LOGIN_ROUTE = '/login';

export default function withAuth<T>(
  Component: React.ComponentType<T>,
  routePermission: PermissionsList | GeneralPermission,
  withRefetch = false
) {
  return (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    //#region  //*=========== STORE ===========
    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();
    //#endregion  //*======== STORE ===========

    // Check if user is authenticated
    const checkAuth = React.useCallback(() => {
      const token = getToken();
      if (!token) {
        isAuthenticated && logout();
        stopLoading();
        return;
      }
      const loadUser = async () => {
        try {
          const res = await api.get<ApiResponse<MeResponse>>('/me');
          const permissions = res.data.data.permissions;

          login({
            name: res.data.data.name,
            email: res.data.data.email,
            role_id: permissions.role_id,
            role: permissions.role,
            token: token,
            permissions: permissions.routes,
            event: {
              is_geolympic: res.data.data.is_geolympic,
            },
          });
        } catch (err) {
          removeToken();
        } finally {
          stopLoading();
        }
      };
      if (!isAuthenticated || withRefetch) {
        loadUser();
      }
    }, [isAuthenticated, login, logout, stopLoading]);
    React.useEffect(() => {
      if (!isLoading || user?.role) {
        if (isAuthenticated) {
          // Prevent authenticated user from accessing auth or other role pages
          if (
            routePermission === 'auth' ||
            routePermission === 'ADMIN' ||
            routePermission === 'USER' ||
            !hasPermission(user, routePermission)
          ) {
            if (searchParams.get('redirect')) {
              router.replace(searchParams.get('redirect') as string);
            } else if (
              routePermission === 'ADMIN' ||
              routePermission === 'USER'
            ) {
              if (
                (user?.role === 'ADMIN' && routePermission === 'USER') ||
                (user?.role === 'USER' && routePermission === 'ADMIN')
              ) {
                showToast(
                  'Anda tidak memiliki akses ke halaman tersebut',
                  WARNING_TOAST
                );
                router.replace(
                  user?.role === 'ADMIN' ? ADMIN_ROUTE : USER_ROUTE
                );
              }
            } else {
              if (routePermission !== 'auth') {
                showToast(
                  'Anda belum memiliki akses halaman tersebut. Mohon cek kembali guidebook perlombaan.',
                  WARNING_TOAST
                );
              }
              router.replace(user?.role === 'ADMIN' ? ADMIN_ROUTE : USER_ROUTE);
            }
          }
        } else {
          // Prevent unauthenticated user from accessing protected pages
          if (routePermission !== 'auth') {
            router.replace(`${LOGIN_ROUTE}?redirect=${pathname}`);
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, router, isLoading]);

    React.useEffect(() => {
      checkAuth();

      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    if (
      // If unauthenticated user want to access protected pages
      ((isLoading || !isAuthenticated) && routePermission !== 'auth') ||
      ((isLoading || isAuthenticated) &&
        routePermission === 'ADMIN' &&
        user?.role === 'USER') ||
      ((isLoading || isAuthenticated) &&
        routePermission === 'USER' &&
        user?.role === 'ADMIN') ||
      ((isLoading || isAuthenticated) &&
        routePermission !== 'auth' &&
        routePermission !== 'ADMIN' &&
        routePermission !== 'USER' &&
        !hasPermission(user, routePermission))
    ) {
      return <Loading />;
    }

    return <Component {...(props as T)} user={user} />;
  };
}
