import React, { useState, useEffect } from 'react';
import { View, Image, Modal, TextInput, ImageBackground, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import SplashScreen from '../../components/splashScreen/index';
import ButtonComponent from '../../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [exibeSplashScreen, setExibeSplashScreen] = useState<boolean>(true);
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const [signupModalVisible, setSignupModalVisible] = useState<boolean>(false);

  const [newNome, setNewNome] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSenha, setNewSenha] = useState('');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    exibeTelaInicial();
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
    console.log('nome -', newNome )
    console.log('email -', newEmail )
    console.log('senha -', newSenha )
  }

  const logarUsuario = async() =>{
    console.log('Email -', email )
    console.log('Senha -', senha )
  }

  return (
    exibeSplashScreen ? (
      <SplashScreen />
    ) : (
      <ImageBackground
        source={require('../../assets/images/imagem2.jpg')}
        style={styles.container}
      >
        <View style={styles.parteCima}>
          <View style={styles.imageLogo}>
            <Image source={require('../../assets/images/iconePlanThec.png')} />
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
