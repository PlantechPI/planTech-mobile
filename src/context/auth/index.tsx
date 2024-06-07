import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { FuncaoNoSistema } from '../../enum/FuncaoNoSistema';
import { Alert } from "react-native";

type AuthContextType = {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  id_Usuario: string;
  setIdUsuario: React.Dispatch<React.SetStateAction<string>>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<boolean>;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  user: any;
  listarCulturas: () => Promise<any>;
  id_cultura: string;
  setIdCultura: React.Dispatch<React.SetStateAction<string>>;
  listarInformacoesDiarias: (dataString: string) => Promise<any>;
  evapoDoDia: (dataString: string) => Promise<any>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [id_Usuario, setIdUsuario] = useState<string>('');
  const [user, setUser] = useState<any>({});
  const [id_cultura, setIdCultura] = useState<string>('');
  const [idCoordenada, setIdCoordenada] = useState<number>(1);

  const api = axios.create({
    baseURL: 'http://34.151.221.155',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        console.error('Erro na resposta da API:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Nenhuma resposta recebida:', error.request);
      } else {
        console.error('Erro na configuração da requisição:', error.message);
      }
      return Promise.reject(error);
    }
  );

  const cadastrar = async (nome: string, email: string, senha: string) => {
    try {
      const payload = { nameUser: nome, emailUser: email, passUser: senha, typeUser: FuncaoNoSistema.agricultor };
      await api.post('/user', payload);
      setAuth(true);
      return true;
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setAuth(false);
      return false;
    }
  };

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const payload = { emailUser: email, passUser: senha, typeUser: FuncaoNoSistema.agricultor };
      const response = await api.post('/login', payload);
      setIdUsuario(String(response.data.idUsuario));
      setAuth(true);
      return true;
    } catch (error) {
      Alert.alert('Erro', JSON.stringify(error))
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const listarCulturas = async () => {
    try {
      const payload = { user_id: id_Usuario };
      const response = await api.get('/listCulturas', { params: payload });
      setAuth(true);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar culturas:', error);
      return false;
    }
  };

  const listarInformacoesDiarias = async (dataString: string) => {
    try {
      const [dia, mes, ano] = dataString.split('/');
      const data_atual = `${ano}-${mes}-${dia}`;
      const url = `/dados/${id_cultura}/${idCoordenada}/${data_atual}/${data_atual}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar informações diárias:', error);
      return false;
    }
  };

  const evapoDoDia = async (dataString: string) => {
    try {
      const [dia, mes, ano] = dataString.split('/');
      const data_atual = `${ano}-${mes}-${dia}`;
      const url = `/evapo/${data_atual}/${id_cultura}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter evapotranspiração do dia:', error);
      return false;
    }
  };

  const logout = () => {
    setAuth(false);
    setIdUsuario('');
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, id_Usuario, setIdUsuario, cadastrar, login, logout, user, listarCulturas, id_cultura, setIdCultura, listarInformacoesDiarias, evapoDoDia }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
