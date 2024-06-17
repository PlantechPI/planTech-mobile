import React from 'react'
import { View, Image, Text, TextInput } from 'react-native'
import styles from './styles/style'
import { CORES } from '../../enum/Cores'

interface ITextInputIcon{
  state:any,
  setState?:any,
  backGroundColor?:string,
  text:string,
  placeholder:string,
}

const TextInputIcon:React.FC<ITextInputIcon> = ({setState, state, text, placeholder}) => {
  return (
    <View>
    <Text style={styles.textoh1}>{text}</Text>
    <TextInput
    style={styles.btnInput}
    placeholder={placeholder}
    onChangeText={(email) => setState(email)}
    value={state}
    keyboardType={'number-pad'}
    />
    </View>
  )
}

export default TextInputIcon