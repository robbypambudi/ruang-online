enum PermissionsEnum {
  'USER',
  'ADMIN',
  'geosentric.index',
  'dashboard_user.index',
  'admin.index',
}

export type PermissionsList = Array<keyof typeof PermissionsEnum>;