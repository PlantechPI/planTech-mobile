import React, {useContext} from 'react'
import { View, Image, Text, TouchableOpacity} from 'react-native'
import styles from './styles/style'
import { CORES } from '../../../../../enum/Cores'
import { AntDesign, FontAwesome, MaterialIcons, FontAwesome6, Ionicons, Entypo } from '@expo/vector-icons'
import { AuthContext } from '../../../../../context/auth'
import { useNavigation } from '@react-navigation/native';


interface ICardCadastrar{
  nomeCultura?: string,
  nomeTipoCultura?: string,
  local?: string,
  id_cultura_atual?:string
}

const CardCadastrar:React.FC<ICardCadastrar> = ({ nomeCultura, nomeTipoCultura, local, id_cultura_atual }) => {
  const navigation = useNavigation();
  const { id_cultura, setIdCultura} = useContext(AuthContext); 

  const mudaIdCultura = () => {
    setIdCultura(id_cultura_atual)
  };
  
  return (//Mostrar no card o nome, tipo da cultura, onde ela está situada e procurar mais alguma coisa para exibir, procurar um icone para cada

  <TouchableOpacity 
  style={styles.container}
  onPress={ mudaIdCultura}>

      <View style={[styles.btn]}> 
        <View style={styles.centro}>
          <Text style={styles.titulo}>{nomeCultura}</Text>
          </View>
      
    <Text> 
    <FontAwesome6 name="plant-wilt" size={24} color='#000'/>
      {nomeTipoCultura}
    </Text>
    <Text>
      <Entypo name="location-pin" size={24} color='#000'/>
      {local}
    </Text>


      </View>
  </TouchableOpacity>
  )
}

export default CardCadastrar