import { UserType, GetUsersParams } from './../types/index';
import request from "../../../utils/axios";

export async function createUser(data: UserType): Promise<void> {
  await request({
    url: "users/",
    method: "post",
    data,
  });
}

export async function getUsers(
  params: GetUsersParams = {}
): Promise<UserType[]> {
  const { page = 1, pageSize = 10 } = params;

  const res = await request({
    url: `users/?page=${page}&page_size=${pageSize}`,
    method: "get",
  });

  return res;
}

export async function updateUserInfo(
  id: number,
  data: { salary: number; is_active: boolean }
): Promise<void> {
  await request({
    url: `users/edit-user-info/${id}/`,
    method: "patch",
    data,
  });
}

export async function changeUserPassword(
  id: number,
  password: string
): Promise<void> {
  await request({
    url: `user/change-password/`,
    method: "post",
    data: {
      id,
      password,
    },
  });
}
