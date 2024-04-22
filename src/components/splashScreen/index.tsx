import React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './styles/style'

const SplashScreen = () => {
  const image = '../../assets/images/iconePlanThec.png'
  return (
    <View style={styles.container}>
      <Image source={require(image)} />
    </View>
  )
}

export default SplashScreen