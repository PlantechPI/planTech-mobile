import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig, ImageBackground, Text } from 'react-native'
import styles  from './styles'
import SplashScreen from '../../components/splashScreen/index'
import ButtonComponent from '../../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native';
import CardCadastrar from './components/CardCadastrar'
import { CORES } from '../../enum/Cores'



const Cadastrar = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        {/* Metade inferior com a cor de fundo */}
        <View style={styles.halfBackground} />
        
        {/* Conteúdo que fica por cima do fundo */}
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <CardCadastrar 
            backGroundColor={CORES.background}/>
          </View>

        </View>
      </View>
    );
}
export default Cadastrar
