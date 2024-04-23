import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './styles/style'
import { CORES } from '../../../../enum/Cores'

interface ICardCadastrar{
  textoBtn?: string,
  onPress?:any,
  backGroundColor?:string
}

const CardCadastrar:React.FC<ICardCadastrar> = ({ backGroundColor }) => {
  return (
    <View style={styles.container}>
        <View style={[styles.btn, {backgroundColor: backGroundColor? backGroundColor: CORES.primaria}]}>
          <Text style={styles.textoh1}>Digite seu nome</Text>
        </View>
    </View>
  )
}

export default CardCadastrar