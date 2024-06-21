import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { CORES } from '../../../../../../enum/Cores';

interface ICardStatusCultura {
  informacao: string;
  icone?: {
    nomeIcon: keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof MaterialIcons.glyphMap;
    directory: string;
    color?: string;
  };
  label?: string;
  data?: any;
}

const CardTotal: React.FC<ICardStatusCultura> = ({ informacao, icone, label, data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  const navigation = useNavigation();

  const detalharHistoricoDiaHorario = () => {
    navigation.navigate('Detalhar horário', { data });
  };

  useEffect(() => {
    if (icone?.directory === 'MaterialCommunityIcons' && icone?.nomeIcon) {
      setIcon(<MaterialCommunityIcons name={icone.nomeIcon} size={26} color={icone.color ? icone.color : CORES.verdeClaro}/>);
    }else if(icone?.directory === 'MaterialIcons' && icone?.nomeIcon){
      setIcon(<MaterialIcons name={icone.nomeIcon} size={26} color={icone.color ? icone.color : CORES.verdeClaro}/>);
    }else if(icone?.directory === 'Fontisto' && icone?.nomeIcon){
      setIcon(<Fontisto name={icone.nomeIcon} size={26} color={icone.color ? icone.color : CORES.verdeClaro}/>)
    }
    // Adicione outras condições para outras bibliotecas de ícones aqui
  }, [icone]);

  return (
    <>
    <TouchableOpacity onPress={() => detalharHistoricoDiaHorario()}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.icone}>
            <View style={styles.fundoIcone}>
              {icon && <View>{icon}</View>}
            </View>
          </View>
          <View style={styles.informacoes}>
            <Text style={styles.textoLabel}>{label}</Text>
            <Text style={styles.textoInformacao}>{informacao}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    
        </>
    
  );
};

export default CardTotal;
