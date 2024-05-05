import React, {useContext} from 'react'
import { View, Image, Text, TouchableOpacity} from 'react-native'
import styles from './styles/style'
import { CORES } from '../../../../enum/Cores'
import { AntDesign, FontAwesome, MaterialIcons, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../../../../context/auth'


interface ICardCadastrar{
  nomeCultura?: string,
  nomeTipoCultura?: string,
  local?: string,
}

const CardCadastrar:React.FC<ICardCadastrar> = ({ nomeCultura, nomeTipoCultura, local }) => {
  
  return (//Mostrar no card o nome, tipo da cultura, onde ela está situada e procurar mais alguma coisa para exibir, procurar um icone para cada
  <TouchableOpacity style={styles.container}>
      <View style={[styles.btn]}> 


      </View>
  </TouchableOpacity>
  )
}

export default CardCadastrar