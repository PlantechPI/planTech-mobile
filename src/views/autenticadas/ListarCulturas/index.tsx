import React, {useState, useEffect, useContext} from 'react'
import { View, Image, TextInput, Button, Platform, Alert, KeyboardAvoidingView, Keyboard, SafeAreaView, LayoutAnimation, LayoutAnimationConfig, ImageBackground, Text } from 'react-native'
import styles  from './styles'
import SplashScreen from '../../../components/splashScreen/index'
import ButtonComponent from '../../../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native';
import { FuncaoNoSistema } from '../../../enum/FuncaoNoSistema'
import CardCultura from './components/CardCultura'
import { CORES } from '../../../enum/Cores'
import { AuthContext } from '../../../context/auth'
 

const ListarCulturas = () => {
  const { setIdMiniestacao, id_cultura, setIdCultura, listarCulturas, retornaIdMiniEstacao } = useContext(AuthContext);

  const navigation = useNavigation();
  const [culturas, setCulturas] = useState([]);

  
  useEffect(() => {
    const retornaCulturas = async () => {
      const listaCulturas = await listarCulturas();
      setCulturas(listaCulturas);
    };
    retornaCulturas();
  }, []);



    return (
        
        <View style={styles.container}>

            <ImageBackground 
            source={require('../../../assets/images/image (1).png')} 
            style={styles.containerBackGround}
            resizeMode='cover'>
        <View style={styles.contentContainer}>
            {culturas.map((element: any, index: number) => (
                <CardCultura
                key={index} 
                nomeCultura={`CULTURA ${index+1}`}
                nomeTipoCultura={element.nomeCultura}
                local='Vila Velha, Espírito Santo'
                dataPlantio = {element.dataPlantio}
                id_cultura_atual={element.idCultura}
                />
                ))}
        </View>
    </ImageBackground>
        </View>
    );
}
export default ListarCulturas
