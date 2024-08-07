import request from "../../../utils/axios";
import {User} from '../../../types';
import { ChangePasswordData } from "../types";
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

export async function changePassword(
  data: ChangePasswordData
): Promise<void> {
  await request({
    url: `change-password/`,
    method: "post",
    data,
  });
}