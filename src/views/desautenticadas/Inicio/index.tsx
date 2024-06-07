import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Modal, TextInput, ImageBackground, TouchableOpacity, Text, Alert } from 'react-native';
import styles from './styles';
import SplashScreen from '../../../components/splashScreen/index';
import ButtonComponent from '../../../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../context/auth'

const Home = () => {
  const { cadastrar, login } = useContext(AuthContext)
  const navigation = useNavigation();
  const [exibeSplashScreen, setExibeSplashScreen] = useState<boolean>(true);
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const [signupModalVisible, setSignupModalVisible] = useState<boolean>(false);
  const imagens = [require('../../../assets/images/imagem2.jpg'), require('../../../assets/images/imagem1.jpg'), require('../../../assets/images/imagem3.jpg'), require('../../../assets/images/imagem4.jpg'), require('../../../assets/images/imagem5.jpg'), require('../../../assets/images/imagem6.jpg'), require('../../../assets/images/imagem7.jpg'), require('../../../assets/images/imagem8.jpg')]
  const [numAleatorio, setNumAleatorio] = useState<number>(0)

  const [newNome, setNewNome] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSenha, setNewSenha] = useState('');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const getRandomInt = (min:number, max:number):number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  useEffect(() => {
    exibeTelaInicial();
    setNumAleatorio(getRandomInt(0,7))
  }, []);

  const exibeTelaInicial = () => {
    setTimeout(() => {
      setExibeSplashScreen(false);
    }, 2000);
  };

  const openLoginModal = () => {
    setLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const openSignupModal = () => {
    setSignupModalVisible(true);
  };

  const closeSignupModal = () => {
    setSignupModalVisible(false);
  };

  const handleLoginModalPressOutside = () => {
    closeLoginModal();
  };

  const handleSignupModalPressOutside = () => {
    closeSignupModal();
  };

  const cadastrarUsuario = async() =>{
    const res = await cadastrar(newNome, newEmail, newSenha)
    limparCadastro()
  }

  const limparLogin = () =>{
    setEmail('')
    setSenha('')
  }

  const limparCadastro = () =>{
    setNewEmail('')
    setNewNome('')
    setNewSenha('')
  }

  const logarUsuario = async() =>{
    const resLogin = await login(email, senha)
    
    if(!resLogin){
      limparLogin()
      closeLoginModal()
      Alert.alert('ERRO: ', 'resLogin')
    }
  }

  return (
    exibeSplashScreen ? (
      <SplashScreen />
    ) : (
      <ImageBackground
        source={imagens[numAleatorio]}
        style={styles.container}
      >
        <View style={styles.parteCima}>
          <View style={styles.imageLogo}>
            <Image source={require('../../../assets/images/iconePlanThec.png')} />
          </View>
        </View>
        <View style={styles.parteBaixo}>
          <ButtonComponent
            textoBtn='Logar'
            onPress={openLoginModal}
          />
          <ButtonComponent
            textoBtn='Cadastrar'
            onPress={openSignupModal}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={loginModalVisible}
            onRequestClose={closeLoginModal} //validar dados
          >
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={handleLoginModalPressOutside} //validar dados
            >
              <View style={styles.modalView}>
                <Text style={styles.textoh1}>Digite seu email</Text>
                <TextInput
                  style={styles.btnInput}
                  placeholder="Email"
                  onChangeText={(email) => setEmail(email)}
                  value={email}
                />

                <Text style={styles.textoh1}>Digite sua senha</Text>
                <TextInput
                  style={styles.btnInput}
                  placeholder="Senha"
                  secureTextEntry={true}
                  onChangeText={(senha) => setSenha(senha)}
                  value={senha}
                />

                <ButtonComponent
                  textoBtn='Logar'
                  onPress={logarUsuario}
                />
              </View>
            </TouchableOpacity>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={signupModalVisible}
            onRequestClose={closeSignupModal}
          >
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={handleSignupModalPressOutside} //cadastrar usuario
            >
              <View style={styles.modalView}>
                <Text style={styles.textoh1}>Digite seu nome</Text>
                <TextInput
                  style={styles.btnInput}
                  placeholder="Nome"
                  onChangeText={(newNome) => setNewNome(newNome)}
                  value={newNome}
                />

                <Text style={styles.textoh1}>Digite seu email</Text>
                <TextInput
                  style={styles.btnInput}
                  placeholder="Email"
                  onChangeText={(newEmail) => setNewEmail(newEmail)}
                  value={newEmail}
                />

                <Text style={styles.textoh1}>Digite sua senha</Text>
                <TextInput
                  style={styles.btnInput}
                  placeholder="Senha"
                  secureTextEntry={true}
                  onChangeText={(newSenha) => setNewSenha(newSenha)}
                  value={newSenha}
                />

                <ButtonComponent
                  textoBtn='Cadastrar'
                  onPress={cadastrarUsuario}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </ImageBackground>
    )
  );
};

export default Home;
