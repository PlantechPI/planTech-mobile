import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { FuncaoNoSistema } from '../../enum/FuncaoNoSistema';

type AuthContextType = {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  id_Usuario: string;
  setIdUsuario: React.Dispatch<React.SetStateAction<string>>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<boolean>;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  user: any;
  listarCulturas: ()=> Promise<any>;
  id_cultura: string;
  setIdCultura: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [id_Usuario, setIdUsuario] = useState<string>('');
  const [user, setUser] = useState<any>({});
  const [culturaSelecionada, setCulturaSelecionada] = useState({})
  const [id_cultura, setIdCultura] = useState('')

  const api = axios.create({ baseURL: 'http://34.151.221.155' });

  const cadastrar = async (nome: string, email: string, senha: string) => {
    try {
      const payload = { nameUser: nome, emailUser: email, passUser: senha, typeUser: FuncaoNoSistema.agricultor };
      const response = await api.post('/user', payload);
      setAuth(true);
      return true
    } catch (error) {
      setAuth(false);
      return false
    }
  };

  const login = async (email: string, senha: string): Promise<string> => {
    try {
      const payload = { emailUser: email, passUser: senha, typeUser: FuncaoNoSistema.agricultor };
      const response = await api.post('/login', payload);
      setIdUsuario(String(response.data.idUsuario))
      setAuth(true);
      return true;
    } catch (error) {
      return false;
    }
  };

  const listarCulturas = async() =>{
    try {
      const payload = { user_id: id_Usuario};

      const response = await api.get('/listCulturas', payload);
      console.log('Resposta do listarCulturas:', response.data);
      setAuth(true);
      return response.data;
    } catch (error) {
      console.log('erro', error)
      return false;
    }
  };

  

  

  const logout = async () => {
    setAuth(false);
    setIdUsuario('');
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, id_Usuario, setIdUsuario, cadastrar, login, logout, user, listarCulturas, id_cultura, setIdCultura }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
