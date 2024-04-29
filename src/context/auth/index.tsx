import React, { createContext, useState, ReactNode, SetStateAction, Dispatch } from "react";
import axios from "axios"
import { FuncaoNoSistema } from '../../enum/FuncaoNoSistema'

type AuthContextType = {
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    id_Usuario: string;
    setIdUsuario: React.Dispatch<React.SetStateAction<string>>;
    cadastrar:(nome:string, email:string, senha:string)=>Promise<void>;
    login:(email:string, senha:string)=>Promise<string>;
    logout:()=>void;
    user:any
  };

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [id_Usuario, setIdUsuario] = useState<string>('');
  const [user, setUser] = useState<any>({});
  const api = axios.create({baseURL:' http://34.151.221.155'});

  const cadastrar = async(nome:string, email:string, senha:string) =>{
    console.log('New nome - ', nome)
    console.log( 'email - ', email)
    console.log( 'senha - ', senha)

    const payload = {nameUser: nome, emailUser: email, passUser: senha, typeUser: FuncaoNoSistema.agricultor}


    const response = await api.post(`/users`, payload)

    console.log('resposta - ', response)
    console.log('cheguei')
    setAuth(true)
  }

  const login = async(email:string, senha:string):Promise<string> =>{
    console.log( 'email - ', email)
    console.log( 'senha - ', senha)

    const payload = {emailUser: email, passUser: senha, typeUser: FuncaoNoSistema.agricultor}
    const response = await api.post(`/cadastrar`, payload)

    console.log(response)

    return response

  }

  const logout = async() =>{
    setAuth(false);
    setIdUsuario('');
    setUser({})
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, id_Usuario, setIdUsuario, cadastrar, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;