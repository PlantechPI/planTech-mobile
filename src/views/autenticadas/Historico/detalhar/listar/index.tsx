import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig, ImageBackground, Text } from 'react-native'
import styles  from './styles'
import { useNavigation } from '@react-navigation/native';


const HistoricoDetalhado:React.FC = () => {
    const navigation = useNavigation();
    return (
          <View style={styles.container}>
              <Text> Histórico detalhado</Text>
          </View>

    )
}
export default HistoricoDetalhado;
