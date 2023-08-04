enum PermissionsEnum {
  'USER',
  'ADMIN',
  'geosentric.index',
  'dashboard_user.index',
  'tryout.index',
  'admin.index',
  'admin_tryout.store',
}

export type PermissionsList = Array<keyof typeof PermissionsEnum>;
