import { CreateUsersDataType } from './../types/index';
import request from "../../../utils/axios";

export async function createUser(data: CreateUsersDataType): Promise<void> {
  await request({
    url: "users/",
    method: "post",
    data,
  });
}
