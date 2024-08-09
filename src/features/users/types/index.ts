export interface UserType {
  id?: number;
  username: string;
  full_name: string;
  user_type: string;
  is_active: boolean;
  password?: string;
  salary?:number;
  phone_number?:string;
}

export interface GetUsersParams {
  page?: number;
  pageSize?: number;
}
// export interface ResultsUserType {
//   results: UserType;
// }