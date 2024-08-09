import  { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface User {
  id:number;
  full_name: string;
  username: string;
  user_type: string;
  phone_number: string;
  salary: number;
  last_login?:string;
  date_joined?: string;
}

interface AuthContextProps {
  isAuth: boolean;
  user: User | null;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const authContext = createContext<AuthContextProps>({
  isAuth: false,
  user: null,
  setIsAuth: () => {},
  setUser: () => {},
});

authContext.displayName = "AuthContext";

const AuthContextConsumer = authContext.Consumer;

export { AuthContextConsumer as AuthConsumer, authContext, useAuthContext };

function useAuthContext(): AuthContextProps {
  return useContext(authContext);
}
