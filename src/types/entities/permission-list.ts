enum PermissionsEnum {
  'USER',
  'ADMIN',
  'geosentric.index',
  'dashboard_user.index',
}

export type PermissionsList = Array<keyof typeof PermissionsEnum>;
