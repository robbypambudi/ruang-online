enum PermissionsEnum {
  'USER',
  'ADMIN',
  'geosentric.index',
  'dashboard_user.index',
  'tryout.index',
  'admin.index',
  'admin_tryout.store',
  'admin_tryout.index',
}

export type PermissionsList = Array<keyof typeof PermissionsEnum>;
