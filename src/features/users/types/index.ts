export interface UserType {
  id?: number;
  username: string;
  full_name: string;
  type: string;
  is_active: boolean;
  password?: string;
  salary?:number;
  phone_number?:string;
}

// export interface ResultsUserType {
//   results: UserType;
// }