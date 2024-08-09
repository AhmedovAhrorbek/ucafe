import React, { useState, useEffect, useMemo } from "react";
import { authContext } from "../contexts/auth-context";
import { User } from "../types";

interface Props {
  children: React.ReactElement;
}

const accessToken = localStorage.getItem("access_token");
const storedUser = localStorage.getItem("user");

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(Boolean(accessToken));
  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const value = useMemo(
    () => ({ isAuth, user, setIsAuth, setUser }),
    [isAuth, user]
  );

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
