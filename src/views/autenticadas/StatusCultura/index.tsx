import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import AuthContext from '../../../context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from './components/Card'


const StatusCultura = () => {
  const { listarInformacoesDiarias, evapoDoDia } = useContext(AuthContext)
  const [ dataAtual, setDataAtual] = useState<string>('')
  const [ dadosAtuais, setDadosAtuais] = useState<any[]>([])
  const [ currentEvapo, setCurrentEvapo] = useState<number>(0)
  
  
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return (`${day}/${month}/${year}`);
  };

  const recuperarDados = async() =>{
    const currentData = getCurrentDate();
    setDataAtual(currentData)
    const res = await listarInformacoesDiarias(currentData)
    const evapoDodia = await evapoDoDia(currentData)
    setCurrentEvapo(evapoDodia.ETO)
    setDadosAtuais(res)
  }

  useEffect(() =>{
    recuperarDados();
  }, [])


    return (
          <View style={styles.container}>
            <View>
              <Text style={styles.titulo}> {dataAtual}</Text>
            </View>
            <View style={styles.cards}>
              <Card 
              icone={{nomeIcon: 'pine-tree-fire', directory:'MaterialCommunityIcons'}}
              label={'EVAPOTRANSPIRAÇÃO'} //<MaterialCommunityIcons name='pine-tree-fire' size={26} />
              informacao={String(currentEvapo)}
              />
              {/* <Card 
              informacao={'dsa'}
              />
              <Card 
              informacao={'dsa'}
              />
              <Card 
              informacao={'dsa'}
              /> */}
            </View>
          </View>

    )
}
export default StatusCultura;
