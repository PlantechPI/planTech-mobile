import React, {useState, useEffect, useContext} from 'react'
import { View, TextInput, Text } from 'react-native'
import styles  from './styles'
import ButtonComponent from '../../../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { CORES } from '../../../enum/Cores'
import AuthContext from '../../../context/auth';
import TextInputComponent from '../../../components/TextInputIcon'



const Configuracoes = () => {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext)

    const [potassio, setPotassio] = useState()
    return (
      <View style={styles.container}>
        <View style={styles.tituloPrincipal}>
          <View>
            <Text style={styles.titulo}>IRRIGAÇÃO</Text>
          </View>
        </View>
        <View style={styles.formView}>

        <TextInputComponent 
        state={potassio}
        setState={setPotassio}
        text='POTÁSSIO'
        placeholder='Digite um valor'
        />

        </View>



            </View>

    )
}
export default Configuracoes;
