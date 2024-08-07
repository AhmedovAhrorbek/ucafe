import { UserType } from './../types/index';
import request from "../../../utils/axios";

export async function createUser(data: UserType): Promise<void> {
  await request({
    url: "users/",
    method: "post",
    data,
  });
}

export async function getUsers(): Promise<UserType[]> {
  const response = await request({
    url: "users/",
    method: "get",
  });
  return response.results;
}