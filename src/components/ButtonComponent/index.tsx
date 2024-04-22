import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import styles from './styles/style'

interface IButtonComponent{
  textoBtn: string,
  onPress?:any 
}

const ButtonComponent:React.FC<IButtonComponent> = ({textoBtn, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={onPress}>
        <View style={styles.btn}>
          <Text style={styles.textoBtn}>{textoBtn}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonComponent