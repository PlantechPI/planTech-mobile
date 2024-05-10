import React, {useState, useEffect, useContext} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface ICardHistorico{
    data:string
}

const CardHistorico:React.FC<ICardHistorico> = ({data}) => {
    const navigation = useNavigation();
    const detalharHistorico = () =>{
        navigation.navigate('HistoricoDetalhado')
    }
    return (
        // <TouchableOpacity onPress={detalharHistorico}>
          <View style={styles.container}>
            <Text>{data}</Text>
          </View>
        // </TouchableOpacity>

    )
}
export default CardHistorico;
