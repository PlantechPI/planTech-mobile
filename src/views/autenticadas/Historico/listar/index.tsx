import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig, ImageBackground, Text, FlatList, TouchableOpacity } from 'react-native'
import styles  from './styles'
import SplashScreen from '../../../../components/splashScreen'
import ButtonComponent from '../../../../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../../context/auth'
import CardHistorico from './components/CardHistorico/index'

const Historico:React.FC = () => {
  const { listarInformacoesDiarias } = useContext(AuthContext)
  
  // listarInformacoesDiarias()
  const [listaDeDatas, setListaDeDatas] = useState<string[]>([])

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return (`${day}/${month}/${year}`);
  };
 
  const subtractOneDay = (dateString:string) => {
    if (!dateString || typeof dateString !== 'string') {
      return null; // Retorna null se a string da data não for válida
    }
    
    const dateParts = dateString.split('/');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Subtrai 1 porque os meses em JavaScript começam em 0
    const year = parseInt(dateParts[2], 10);
    const date = new Date(year, month, day);

    date.setDate(date.getDate() - 1);

    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    return formattedDate;
  };

  const generateDates = () => {
    if(listaDeDatas[0]){

    let ultimaData = listaDeDatas[listaDeDatas.length - 1]; 

    for (let i = 0; i < 15; i++) {
      let newDate = subtractOneDay(ultimaData);
  
      if (newDate) {
        ultimaData = newDate;
        setListaDeDatas(prevLista => [...prevLista, newDate]); 
      } else {
        break; 
      }
    }
  }else{
    let ultimaData = getCurrentDate(); 

    // let newDate = subtractOneDay(ultimaData);
    for (let i = 0; i < 15; i++) {
      let newDate = subtractOneDay(ultimaData);
  
      if (newDate) {
        ultimaData = newDate;
        setListaDeDatas(prevLista => [...prevLista, newDate]); 
      } else {
        break; 
      }

  }
  };
}

  useEffect(() =>{
    const diaAtual = getCurrentDate()
    setListaDeDatas(previousDate => [...previousDate, diaAtual])
  }, [])


  useEffect(() =>{
    generateDates()
  }, [])

const geraMaisDatas = () =>{
  generateDates()
} 

console.log('lista de datas: ', listaDeDatas)

const renderItem = ({ item }: any) => (
  <View style={{ padding: 10 }}>
    <CardHistorico data={item}/>
  </View>
);


    const navigation = useNavigation();
    return (
          <View style={styles.container}>
                <FlatList 
                  data={listaDeDatas}
                  keyExtractor={item => item}
                  renderItem={renderItem}
                  onEndReached={geraMaisDatas}
                  style={[{ flex: 1 }, styles.conteudo]}
                  />
          </View>

    )
}
export default Historico;
