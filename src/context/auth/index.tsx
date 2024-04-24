import React, { createContext, useState, ReactNode, SetStateAction, Dispatch } from "react";

type AuthContextType = {
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    id_Usuario: string;
    setIdUsuario: React.Dispatch<React.SetStateAction<string>>;
  };

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [id_Usuario, setIdUsuario] = useState<string>('');


  return (
    <AuthContext.Provider value={{ auth, setAuth, id_Usuario, setIdUsuario}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;