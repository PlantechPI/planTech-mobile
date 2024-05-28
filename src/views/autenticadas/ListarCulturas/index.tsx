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
  const { id_cultura, setIdCultura, listarCulturas } = useContext(AuthContext);

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
      {/* Metade inferior com a cor de fundo */}
      <View style={styles.halfBackground} />
      <View style={styles.contentContainer}>
        {culturas.map((element: any, index: number) => (
          <CardCultura
            key={index} // Adicione uma chave única para cada componente na iteração
            nomeCultura={`CULTURA ${index+1}`}
            nomeTipoCultura={element.nomeCultura}
            local='Vitória, Espírito Santo'
            id_cultura_atual={element.idCultura}
          />
        ))}
      </View>
    </View>
    );
}
export default ListarCulturas
