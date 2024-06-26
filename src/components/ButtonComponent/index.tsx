import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './styles/style'
import { CORES } from '../../enum/Cores'

interface IButtonComponent{
  textoBtn: string,
  onPress?:any,
  backGroundColor?:string
}

const ButtonComponent:React.FC<IButtonComponent> = ({textoBtn, onPress, backGroundColor}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={onPress}>
        <View style={[styles.btn, {backgroundColor: backGroundColor? backGroundColor: CORES.primaria}]}>
          <Text style={styles.textoBtn}>{textoBtn}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonComponent