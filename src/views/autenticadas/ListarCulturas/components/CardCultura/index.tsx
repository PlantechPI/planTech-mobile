import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles/style';
import { FontAwesome5, Entypo, Fontisto } from '@expo/vector-icons';
import { AuthContext } from '../../../../../context/auth';
import { useNavigation } from '@react-navigation/native';

interface ICardCadastrar {
  nomeCultura?: string;
  nomeTipoCultura?: string;
  local?: string;
  id_cultura_atual: string;
}

const CardCadastrar: React.FC<ICardCadastrar> = ({ nomeCultura, nomeTipoCultura, local, id_cultura_atual }) => {
  const navigation = useNavigation<any>();
  const { setIdMiniestacao, id_cultura, retornaIdMiniEstacao, setIdCultura } = useContext(AuthContext);

  const mudaIdCultura = () => {
    setIdCultura(id_cultura_atual);
    navigation.navigate('MainTabs'); // Navegar para o TabRoutes
  };

  useEffect(() => {
    const retornaEstacao = async () => {
      const id_ministacao = await retornaIdMiniEstacao(Number(id_cultura_atual));
      console.log("ID ministaçao enviado para o context:" + id_ministacao)
      setIdMiniestacao(id_ministacao);
    };
    retornaEstacao();
    
  }, [id_cultura]);

  return (
    <TouchableOpacity style={styles.container} onPress={mudaIdCultura}>
      <View style={[styles.btn]}>
        <View style={styles.centro}>
          <Text style={styles.titulo}>{nomeCultura}</Text>
        </View>

        <View style={styles.boxText}>
          <FontAwesome5 name="leaf" size={24} style={styles.icon} />
          <Text style={styles.text}>{nomeTipoCultura}</Text>
        </View>

        <View style={styles.boxText}>
          <Entypo name="location" size={26} style={styles.icon} />
          <Text style={styles.text}>{local}</Text>
        </View>

        <View style={styles.boxText}>
          <Fontisto name="date" size={26} style={styles.icon} />
          <Text style={styles.text}>22/05/2024</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardCadastrar;
