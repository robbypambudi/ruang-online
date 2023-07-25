import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { FiChevronDown } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/links/UnstyledLink';

import useAuthStore from '@/store/useAuthStore';

import { navigations } from '@/constant/navigation';

import { PermissionsList } from '@/types/entities/permission-list';
import type { Navigation } from '@/types/navigate';

type NavigationProps = {
  sidebarOpen: boolean;
} & React.ComponentPropsWithoutRef<'nav'>;

export default function Navigation({
  className,
  sidebarOpen,
  ...rest
}: NavigationProps) {
  return (
    <nav className={clsxm('', className)} {...rest}>
      <div className='space-y-1.5'>
        {navigations.map((nav) =>
          nav.children ? (
            <NestedNavigation
              navigation={nav}
              key={nav.name}
              gen={0}
              sidebarOpen={sidebarOpen}
            />
          ) : (
            <NavigationLink
              key={nav.name}
              navigation={nav}
              gen={0}
              sidebarOpen={sidebarOpen}
            />
          )
        )}
      </div>
    </nav>
  );
}

function NestedNavigation({
  navigation: navChildren,
  sidebarOpen,
  gen,
}: {
  navigation: Navigation;
  gen: number;
  sidebarOpen: boolean;
}) {
  const pathname = usePathname();

  function getChildrenPermission(nav?: Navigation[]): PermissionsList {
    return (
      nav?.flatMap((n) => {
        const tempPermission: PermissionsList = [];
        if (n.permissions) {
          tempPermission.push(...n.permissions);
        }
        if (n.children) {
          tempPermission.push(...getChildrenPermission(n.children));
        }
        return tempPermission;
      }) || []
    );
  }

  const user = useAuthStore.useUser();
  const navChildrenWithPermission = getChildrenPermission(navChildren.children);
  const hasPermission =
    navChildrenWithPermission && navChildrenWithPermission.length > 0
      ? navChildrenWithPermission.some((p) => user?.permissions.includes(p))
      : true;

  if (!hasPermission) return null;

  function comparePaths(pathname: string, href: string): boolean {
    // Implement your custom logic to compare the paths here
    // For example, you can use a regular expression or any other string comparison method

    // Example using string comparison for partial match
    return pathname === href;
  }

  function checkActive(nav?: Navigation[], currentPath = pathname): boolean {
    if (!nav) return false;

    return nav.some((n) => {
      if (!n.children) {
        return comparePaths(currentPath, n.href);
      }

      return checkActive(n.children, currentPath);
    });
  }

  return (
    <Disclosure
      as='div'
      defaultOpen={checkActive(navChildren.children, pathname)}
    >
      {({ open }) => (
        <div>
          <Disclosure.Button
            className={clsx(
              'md:hover:bg-[#687083]',
              'text-white',
              'font-mediumm group flex w-full items-center px-6 py-2.5 text-sm',
              'focus-visible:ring-offset-secondary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500'
            )}
            style={{ paddingLeft: gen > 0 ? `${24 * (gen + 1)}px` : '' }}
          >
            <navChildren.icon
              className={clsx(
                'mr-3 flex-shrink-0',
                'text-typo-white text-lg',
                open && 'mt-[1px] self-start'
              )}
              aria-hidden='true'
            />
            {sidebarOpen && (
              <span
                className={clsx(
                  'text-left font-primary text-[14px] font-semibold',
                  !open && 'truncate'
                )}
              >
                {navChildren.name}
              </span>
            )}
            <FiChevronDown
              className={clsx(
                'flex-shrink-0',
                'ml-auto text-xl text-gray-400 transition-transform duration-300 ease-in-out',
                open && 'mt-[1px] rotate-180 self-start'
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className='mt-1'>
            {navChildren.children?.map((nav) =>
              nav.children ? (
                <NestedNavigation
                  key={nav.name}
                  navigation={nav}
                  gen={gen + 1}
                  sidebarOpen={sidebarOpen}
                />
              ) : (
                <NavigationLink
                  key={nav.name}
                  navigation={nav}
                  gen={gen + 1}
                  sidebarOpen={sidebarOpen}
                />
              )
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

function NavigationLink({
  navigation,
  className,
  gen,
  sidebarOpen,
}: {
  navigation: Navigation;
  className?: string;
  gen: number;
  sidebarOpen: boolean;
}) {
  const pathname = usePathname();
  const isActive = navigation.exactMatch
    ? pathname === navigation.href
    : pathname !== '/dashboard'
    ? pathname === navigation.href
    : pathname.startsWith(navigation.href);

  // check if user has permission to access the route
  const user = useAuthStore.useUser();
  const hasPermission = navigation.permissions
    ? navigation.permissions?.some((p) => user?.permissions.includes(p))
    : true;

  if (!hasPermission) return null;
  return (
    <UnstyledLink
      href={navigation.href}
      className={clsxm(
        !isActive
          ? 'text-typo md:hover:bg-[#687083]'
          : navigation.activeClassName
          ? navigation.activeClassName
          : 'bg-typo text-white md:hover:bg-[#687083]/90',
        'group my-0.5 flex items-center px-6 py-2.5 text-sm font-medium transition-opacity hover:text-white',

        navigation.className,
        className
      )}
      style={{ paddingLeft: gen > 0 ? `${24 * (gen + 1)}px` : '' }}
      aria-current={isActive ? 'page' : undefined}
    >
      <navigation.icon
        className={clsxm(
          ['flex-shrink-0', 'text-lg'],
          sidebarOpen ? 'mr-3' : 'mx-auto'
        )}
        aria-hidden='true'
      />
      {sidebarOpen && (
        <span className='truncate font-primary font-semibold'>
          {navigation.name}
        </span>
      )}
    </UnstyledLink>
  );
}
