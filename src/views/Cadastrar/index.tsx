import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig, ImageBackground, Text } from 'react-native'
import styles  from './styles'
import SplashScreen from '../../components/splashScreen/index'
import ButtonComponent from '../../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native';


const Cadastrar = () => {
    const navigation = useNavigation();
    return (
          <View>
            <Text> Olá Cadastro</Text>
          </View>

    )
}
export default Cadastrar
