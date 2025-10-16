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
  listarCulturas: () => Promise<any>;
  retornaIdMiniEstacao: (id_cultura: number) => Promise<any>;
  id_cultura: string;
  id_miniestacao: number;
  setIdMiniestacao: React.Dispatch<React.SetStateAction<number>>;
  setIdCultura: React.Dispatch<React.SetStateAction<string>>;
  listarInformacoesDiarias: (id_miniestacao: number) => Promise<any>;
  listarInformacoesDiariasData: (id_miniestacao: number, dataString: string) => Promise<any>;
  listarTodasInformacoesDiariasData: (id_miniestacao: number, dataString: string) => Promise<any>;
  getDadosIrrigacao: (dataString: string) => Promise<any>;
  irrigar: () => Promise<any>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [id_Usuario, setIdUsuario] = useState<string>('');
  const [user, setUser] = useState<any>({});
  const [id_cultura, setIdCultura] = useState('');
  const [id_miniestacao, setIdMiniestacao] = useState(0);
  const [idCoordenada, setIdCoordenada] = useState(1);

  const api = axios.create({ baseURL: 'http://10.0.2.2:5000' });

  const cadastrar = async (nome: string, email: string, senha: string) => {
    try {
      const payload = { nameUser: nome, emailUser: email, passUser: senha, typeUser: FuncaoNoSistema.agricultor };
      await api.post('/user', payload);
      setAuth(true);
      return true;
    } catch (error) {
      setAuth(false);
      return false;
    }
  };

  /**
  const login = async (): Promise<boolean> => {
    try {
      setAuth(true);
      return true;
    } catch (error) {
      console.log('Error', error)
      return false;
    }
  };
  */

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const payload = {
        emailUsuario: email,
        senhaUsuario: senha,
      };

      const response = await api.post('/login', payload);

      const usuarioData = response.data.usuario;

      console.log('Login bem-sucedido:', usuarioData);

      // Salva o ID corretamente
      setIdUsuario(String(usuarioData.idUsuario));
      setAuth(true);

      return true;
    } catch (error: any) {
      console.error('Erro no login:', error.response?.data || error.message);
      return false;
    }
  };

  const listarCulturas = async () => {
    try {
      console.log('ID do usuário para listar culturas:', id_Usuario);
      if (!id_Usuario) {
        console.log('ID do usuário não informado');
        return false;
      }

      const response = await api.get(`/usuarios/${id_Usuario}/culturas`);

      if (response.status === 200) {
        setAuth(true);
        console.log(response.data);
        return response.data;
      } else {
        console.log('Erro ao listar culturas:', response.status);
        return false;
      }
    } catch (error) {
      console.log('Erro ao listar culturas:', error);
      return false;
    }
  };

  /*
  const listarInformacoesDiarias = async (dataString: string) => {
    try {
      const [dia, mes, ano] = dataString.split('/');
      const data_atual = `${ano}-${mes}-${dia}`;
      const url = `/dados/${id_cultura}/${idCoordenada}/${data_atual}/${data_atual}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.log('erro', error);
      return false;
    }
  };
 */

  const retornaIdMiniEstacao = async (id_cultura: number) => {
    try {
      const url = `/associacoes/cultura/${id_cultura}`
      const response = await api.get(url);
      return response.data[0].Fk_Miniestacao_idMiniestacao;
    } catch (error) {
      console.log('erro', error);
    }
  };


  const listarInformacoesDiarias = async (id_miniestacao: number) => {
    try{
      const url = `/dados/${id_miniestacao}/ultimo`
      const response = await api.get(url);
      console.log("Informações Diarias", response.data)
      return response.data;

    }catch (error){
      console.log("Erro ao listar informações diárias:", error)
      return null;
    }
  }

  const listarInformacoesDiariasData = async (id_miniestacao: number, data: string) => {
    try {
      const url = `/boletim/${id_miniestacao}/${data}`
      const response = await api.get(url);
      console.log(`Informações do dia ${data}`, response.data)
      return response.data;
    } catch (error) {
      console.log(`Erro ao listar Informações do dia ${data}`, error)
      return null;
    }
  }

  const listarTodasInformacoesDiariasData = async (id_miniestacao: number, data: string) => {
    try {
      const url = `/dados/${id_miniestacao}/${data}`
      const response = await api.get(url);
      console.log(`Todas Informações do dia ${data}`, response)
      return response.data;
    } catch (error) {
      console.log(`Erro ao listar todas Informações do dia ${data}`, error)
      return null;
    }
  }














  const getDadosIrrigacao = async (dataString: string) => {
    try {
      const [dia, mes, ano] = dataString.split('/');
      const data_atual = `${ano}-${mes}-${dia}`;
      const url = `/irrigacao/${data_atual}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.log('erro', error);
      return false;
    }
  };

  const irrigar = async () => {
    try {
      const response = await api.get('/irrigar');
      return response.data;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    setAuth(false);
    setIdUsuario('');
    console.log('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{
      auth, setAuth, id_Usuario, setIdUsuario, cadastrar, login, logout,
      user, listarCulturas, id_cultura, setIdCultura, listarInformacoesDiarias,
      getDadosIrrigacao, irrigar, id_miniestacao, setIdMiniestacao, retornaIdMiniEstacao, listarInformacoesDiariasData, listarTodasInformacoesDiariasData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
