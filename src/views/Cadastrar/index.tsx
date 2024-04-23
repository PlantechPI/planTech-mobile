import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig, ImageBackground, Text } from 'react-native'
import styles  from './styles'
import SplashScreen from '../../components/splashScreen/index'
import ButtonComponent from '../../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native';
import { FuncaoNoSistema } from '../../enum/FuncaoNoSistema'
import CardCadastrar from './components/CardCadastrar'
import { CORES } from '../../enum/Cores'



const Cadastrar = () => {
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
          <View style={styles.card}>
            <View style={styles.box}>
              <View style={[styles.btn]}>

              <Text style={styles.textoh1}>Digite seu nome</Text>
                <TextInput
                style={styles.btnInput}
                onChangeText={(newNome) => setNome(newNome)}
                value={nome}
                placeholder="Nome"
            />

              <Text style={styles.textoh1}>Digite seu email</Text>
                <TextInput
                style={styles.btnInput}
                onChangeText={(newEmail) => setEmail(newEmail)}
                value={email}
                placeholder="Email"
            />

              <Text style={styles.textoh1}>Digite sua senha</Text>
                <TextInput
                style={styles.btnInput}
                onChangeText={(newSenha) => setSenha(newSenha)}
                value={senha}
                placeholder="Senha"
            />

          <ButtonComponent
                textoBtn='Cadastrar'
                onPress={hundleCadastrar}
                />
              </View>

              
              
              
            </View>
          </View>
        </View>
      </View>
    );
}
export default Cadastrar
