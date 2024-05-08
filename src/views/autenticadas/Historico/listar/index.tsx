import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig, ImageBackground, Text } from 'react-native'
import styles  from './styles'
import SplashScreen from '../../../../components/splashScreen'
import ButtonComponent from '../../../../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../../context/auth'
import CardHistorico from './components/CardHistorico/index'

const Historico:React.FC = () => {
  const { listarInformacoesDiarias } = useContext(AuthContext)
  listarInformacoesDiarias()
    const navigation = useNavigation();
    return (
          <View style={styles.container}>
              <View style={styles.conteudo}>
                <CardHistorico data={'12/10/2024'}/>
                <CardHistorico data={'13/10/2024'}/>
                <CardHistorico data={'14/10/2024'}/>

              </View>
          </View>

    )
}
export default Historico;
