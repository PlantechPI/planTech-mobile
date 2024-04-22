import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig, ImageBackground } from 'react-native'
import styles  from './styles'
import SplashScreen from '../../components/splashScreen/index'
import ButtonComponent from '../../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native';


const Home = () => {
    const navigation = useNavigation();
    const [keyBoardIsOpen, setKeyBoardIsOpen] = useState<boolean>();
    const [exibeSplashScreen, setExibeSplashScreen] = useState<boolean>(true)
    const imageLogo = '../../assets/images/iconePlanThec.png'
    // const ImageBackground = '../../assets/images/backgroundImage.jpg'

    useEffect(()=>{
        exibeTelaInicial()
    }, [])

    const exibeTelaInicial = ()=>{
        setTimeout(()=>{
            setExibeSplashScreen(false)
        }, 2000)
    }

    return (
      exibeSplashScreen ? (
          <SplashScreen />
      ) : (
          // <SafeAreaView style={styles.container}>
            <ImageBackground
            source={require('../../assets/images/imagem2.jpg')}
            opacity={0.9}
            style={styles.container}
            >
              <View style={styles.parteCima}>
                <View style={styles.imageLogo}>
                  <Image source={require(imageLogo)} />
                </View>
              </View>
            <View style={styles.parteBaixo}>
                <ButtonComponent
                textoBtn='Logar'
                onPress={() => navigation.navigate('Logar')}
                />

                <ButtonComponent
                textoBtn='Cadastrar'
                onPress={() => navigation.navigate('Cadastrar')}
                />


            </View>

            </ImageBackground>
          // </SafeAreaView>
      )
  );
}



export default Home
