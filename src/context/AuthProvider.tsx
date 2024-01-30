import { ReactNode, createContext, useState } from "react";
import { IAuthContext } from "../hooks/types";

type Props = {
  children?: ReactNode;
};

const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState({});

  console.log("auth provider", auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
