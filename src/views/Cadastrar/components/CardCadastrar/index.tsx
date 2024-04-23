import React from 'react'
import { View, Image, Text, TouchableOpacity, TextInput} from 'react-native'
import styles from './styles/style'
import { CORES } from '../../../../enum/Cores'

interface ICardCadastrar{
  textoBtn?: string,
  onPress?:any,
  backGroundColor?:string,
  handleTextNome?:any,
}

const CardCadastrar:React.FC<ICardCadastrar> = ({ backGroundColor }) => {
  return (
    <View style={styles.container}>
        <View style={[styles.btn, {backgroundColor: backGroundColor? backGroundColor: CORES.primaria}]}>
        <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleTextNome}
        value={text}
        placeholder="Digite algo..."
      />
          <Text style={styles.textoh1}>Digite seu nome</Text>

        </View>
    </View>
  )
}

export default CardCadastrar