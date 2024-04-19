import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig } from 'react-native'
import styles  from './styles'
import SplashScreen from '../../components/splashScreen/index'


const Home = () => {
    const [keyBoardIsOpen, setKeyBoardIsOpen] = useState<boolean>();
    const [exibeSplashScreen, setExibeSplashScreen] = useState<boolean>(true)

    useEffect(()=>{
        exibeTelaInicial()
    }, [])

    const exibeTelaInicial = ()=>{
        setTimeout(()=>{
            setExibeSplashScreen(false)
        }, 2000)
    }

    // const loginContext = useContext(LoginContext)

    const animacaoCostomizada:LayoutAnimationConfig = {
      duration: 2500,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7
      }
    }

    useEffect(() => {
      // Configurando a animação inicial de layout para spring
      LayoutAnimation.configureNext(animacaoCostomizada);
    }, []);

    

  return (
    exibeSplashScreen ? 
    (<SplashScreen />) : (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>  
            <Image style={styles.img}source={{uri:'https://cdn-icons-png.flaticon.com/512/25/25231.png'}}/>
         </KeyboardAvoidingView>
      </SafeAreaView>
    )


  )
}



export default Home
