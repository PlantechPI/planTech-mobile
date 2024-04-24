import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig, ImageBackground, Text } from 'react-native'
import styles  from './styles'
import SplashScreen from '../../components/splashScreen/index'
import ButtonComponent from '../../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native';
import { FuncaoNoSistema } from '../../enum/FuncaoNoSistema'
import CardCultura from './components/CardCultura'
import { CORES } from '../../enum/Cores'




const ListarCulturas = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [senha, setSenha]= useState<string>();
    const funcao = FuncaoNoSistema.agricultor

    const hundleCadastrar = () =>{
      console.log('nome', nome, 'email', email, 'senha', senha)
    }


    return (
      <View style={styles.container}>
        {/* Metade inferior com a cor de fundo */}
        <View style={styles.halfBackground} />
        
        {/* Conteúdo que fica por cima do fundo */}
        <View style={styles.contentContainer}>
          <CardCultura
          nomeCultura='Cultura do zé'
          nomeTipoCultura='UVA'
          local='Vitória, espirito santo'/>
        </View>
      </View>
    );
}
export default ListarCulturas
