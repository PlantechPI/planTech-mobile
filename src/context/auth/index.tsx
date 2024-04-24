import React, { createContext, useState, ReactNode, SetStateAction, Dispatch } from "react";
import axios from "axios";

type AuthContextType = {
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    id_Usuario: string;
    setIdUsuario: React.Dispatch<React.SetStateAction<string>>;
    login:(email:string, senha:string)=>void;
    logout:()=>void;
    user:any
  };

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [id_Usuario, setIdUsuario] = useState<string>('');
  const [user, setUser] = useState<any>({});
  const api = axios.create({baseURL:' http://35.247.220.172'});

  const login = async(email:string, senha:string) =>{
    console.log( 'email - ', email)
    console.log( 'senha - ', senha)
    // api.get()
    setAuth(true)
  }

  const logout = async() =>{
    setAuth(false);
    setIdUsuario('');
    setUser({})
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, id_Usuario, setIdUsuario, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;