import { useState, useMemo } from "react";
import { authContext } from "../contexts/auth-context";
import { useEffect } from "react";
import { User }  from '../types'
interface Props {
  children: React.ReactElement;
}

const accessToken = localStorage.getItem("access_token");
const storedUser = localStorage.getItem("user");

export default function AuthProvider(props: Props): React.ReactElement {
  const { children } = props;

  const [isAuth, setIsAuth] = useState<boolean>(Boolean(accessToken));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

    const value = useMemo(() => ({ isAuth, user, setIsAuth, setUser }),[isAuth, user]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
