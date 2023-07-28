import { PermissionsList } from '@/types/entities/permission-list';

type Permissions = {
  role: 'USER' | 'ADMIN';
  role_id: number;
  routes: PermissionsList;
};

export type User = {
  name: string;
  email: string;
  token: string;
  role: 'USER' | 'ADMIN';
  role_id: number;
  permissions: PermissionsList;

  event: {
    is_geolympic: {
      payment_status: 'unverified' | 'verified' | 'unregistered';
      registration_status: boolean;
    };
  };
};

export interface MeResponse {
  name: string;
  email: string;
  permissions: Permissions;
  username: string;

  is_geolympic: {
    payment_status: 'unverified' | 'verified' | 'unregistered';
    registration_status: boolean;
  };
}
