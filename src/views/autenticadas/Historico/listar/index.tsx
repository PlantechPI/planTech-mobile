import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig, ImageBackground, Text } from 'react-native'
import styles  from './styles'
import SplashScreen from '../../../../components/splashScreen'
import ButtonComponent from '../../../../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native';


const Historico = () => {
    const navigation = useNavigation();
    return (
          <View style={styles.container}>
            <Text> Historico </Text>
          </View>

    )
}
export default Historico;