
interface User {
  full_name: string;
  username: string;
  user_type: string;
  phone_number: string;
  salary: number;
  date_joined: string;
}
interface AuthResponse {
  access: string;
  refresh: string;
  user:User;
}

type sthElse = unknown;

export type { AuthResponse, sthElse };
