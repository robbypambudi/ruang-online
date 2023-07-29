export type ChangePassword = {
  email?: string;
  current_password: string;
  new_password: string;
  re_password: string;
};
