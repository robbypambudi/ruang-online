import { FaUsers } from 'react-icons/fa';
import { FiBook } from 'react-icons/fi';

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
];