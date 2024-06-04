import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig, ImageBackground, Text } from 'react-native'
import styles  from './styles'
import ButtonComponent from '../../../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { CORES } from '../../../enum/Cores'


const Configuracoes = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.modalView}>
                <Text style={styles.textoh1}>Nome</Text>
                <TextInput
                  style={styles.btnInput}
                  placeholder="Nome"
                  // onChangeText={(newNome) => setNewNome(newNome)}
                  // value={newNome}
                />

                <Text style={styles.textoh1}>Email</Text>
                <TextInput
                  style={styles.btnInput}
                  placeholder="Email"
                  // onChangeText={(newEmail) => setNewEmail(newEmail)}
                  // value={newEmail}
                />

                <Text style={styles.textoh1}>Senha</Text>
                <TextInput
                  style={styles.btnInput}
                  placeholder="Senha"
                  secureTextEntry={true}
                  // onChangeText={(newSenha) => setNewSenha(newSenha)}
                  // value={newSenha}
                />
                              <View style={styles.botao}>
                <ButtonComponent
                  textoBtn='Alterar'
                  // onPress={cadastrarUsuario}
                  />
              </View>
              <View>
                <ButtonComponent
                  textoBtn='Ativar bomba'
                  backGroundColor={CORES.vermelho}
                  // onPress={cadastrarUsuario}
                  />
              </View>
        </View>

            </View>

    )
}
export default Configuracoes;
