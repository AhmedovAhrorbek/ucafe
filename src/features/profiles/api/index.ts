import request from "../../../utils/axios";
import {User} from '../../../types';
// import { ChangePasswordData } from "../types";
export async function updateProfile(
  id: number,
  data: User,
): Promise<User> {
  const res: User = await request({
    url: `users/${id}/`,
    method: "patch",
    data,
  });
  return res;
}

export async function getUserById(id: number): Promise<User> {
  const res: User = await request({
    url: `users/${id}/`,
    method: "get",
  });
  return res;
}

export async function changePassword(variables: {
  old_password: string;
  password: string;
  password2: string;
}): Promise<void> {
  const { old_password, password, password2 } = variables;
  await request({
    url: `change-password/`,
    method: "post",
    data: { old_password, password, password2 },
  });
}

export async function editUserInfo(data: {
  username: string;
  phone_number: string;
  full_name: string;
}): Promise<void> {
  await request({
    url: `edit-user-info/`,
    method: "patch",
    data,
  });
}

// export async function getUserDetailsById(id: number): Promise<User> {
//   const res: User = await request({
//     url: `users/${id}/`,
//     method: "get",
//   });
//   return res;
// }