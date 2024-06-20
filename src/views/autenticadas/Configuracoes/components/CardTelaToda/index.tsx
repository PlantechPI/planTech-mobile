import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons, Fontisto, Ionicons, Entypo } from '@expo/vector-icons';
import { CORES } from '../../../../../enum/Cores';

interface ICardStatusCultura {
  informacao: string;
  icone?: {
    nomeIcon: string;
    directory: 'MaterialCommunityIcons' | 'MaterialIcons' | 'Fontisto' | 'Ionicons' | 'Entypo';
    color?: string;
  };
  label?: string;
}

const CardTotal: React.FC<ICardStatusCultura> = ({ informacao, icone, label }) => {
  const [icon, setIcon] = useState<JSX.Element | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (icone?.nomeIcon && icone?.directory) {
      let IconComponent;
      switch (icone.directory) {
        case 'MaterialCommunityIcons':
          IconComponent = MaterialCommunityIcons;
          break;
        case 'MaterialIcons':
          IconComponent = MaterialIcons;
          break;
        case 'Fontisto':
          IconComponent = Fontisto;
          break;
        case 'Ionicons':
          IconComponent = Ionicons;
          break;
        case 'Entypo':
          IconComponent = Entypo;
          break;
        default:
          IconComponent = null;
      }

      if (IconComponent) {
        setIcon(
          <IconComponent
            name={icone.nomeIcon}
            size={26}
            color={icone.color ? icone.color : CORES.verdeClaro}
          />
        );
      }
    }
  }, [icone]);

  return (
    <TouchableOpacity onPress={() => null}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.icone}>
            <View style={styles.fundoIcone}>{icon && <View>{icon}</View>}</View>
          </View>
          <View style={styles.informacoes}>
            <Text style={styles.textoLabel}>{label}</Text>
            <Text style={styles.textoInformacao}>{informacao}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardTotal;
