import { FaUsers } from 'react-icons/fa';
import { FiBook, FiBookOpen, FiUser } from 'react-icons/fi';

import { Navigation } from '@/types/navigate';

export const navigations: Navigation[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    permissions: ['dashboard_user.index'],
    icon: FaUsers,
  },
  {
    name: 'Geolympic',
    href: '/dashboard/geolympic',
    activeClassName: 'bg-typo text-white',
    permissions: ['geosentric.index'],
    icon: FiBook,
  },
  {
    name: 'Tryout',
    href: '/dashboard/tryout',
    permissions: ['tryout.index'],
    icon: FiBookOpen,
  },
  {
    name: 'Peserta',
    href: '/admin',
    permissions: ['admin.index'],
    icon: FiUser,
  },
  {
    name: 'Tryout',
    href: '/admin/tryout',
    permissions: ['admin_tryout.index'],
    icon: FiBookOpen,
  },
];
