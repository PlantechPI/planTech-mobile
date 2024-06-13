import React, {useState, useEffect, useContext} from 'react'
import { View, TextInput, Text } from 'react-native'
import styles  from './styles'
import ButtonComponent from '../../../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { CORES } from '../../../enum/Cores'
import AuthContext from '../../../context/auth';



const Configuracoes = () => {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext)
    return (
      <View style={styles.container}>
        <View style={styles.tituloPrincipal}>
          <View>
            <Text style={styles.titulo}>MEU PERFIL</Text>
          </View>
        </View>
        <View style={styles.formView}>
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
                  backGroundColor={CORES.verde}
                  // onPress={cadastrarUsuario}
                  />
              </View>
              <View>
                <ButtonComponent
                  textoBtn='Ativar Bomba'
                  backGroundColor={CORES.verde}
                  // onPress={cadastrarUsuario}
                  />
              </View>
              <View>
                <ButtonComponent
                  textoBtn='Deslogar'
                  backGroundColor={CORES.verde}
                  onPress={logout}
                  />
              </View>
        </View>

            </View>

    )
}
export default Configuracoes;
