enum PermissionsEnum {
  'USER',
  'ADMIN',
  'geosentric.index',
  'dashboard_user.index',
  'tryout.index',
  'admin.index',
  'admin_tryout.store',
  'admin_tryout.index',
  'admin_tryout_participant.index',
  'ruang-online.index',
}

export type PermissionsList = Array<keyof typeof PermissionsEnum>;
