import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CORES } from '../../../../../enum/Cores';

interface ICardStatusCultura {
  informacao: string;
  icone?: {
    nomeIcon: keyof typeof MaterialCommunityIcons.glyphMap;
    directory: string;
  };
  label?: string;
}

const StatusCultura: React.FC<ICardStatusCultura> = ({ informacao, icone, label }) => {
  
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (icone?.directory === 'MaterialCommunityIcons' && icone?.nomeIcon) {
      setIcon(<MaterialCommunityIcons name={icone.nomeIcon} size={26} color={CORES.verdeClaro}/>);
    }
    // Adicione outras condições para outras bibliotecas de ícones aqui
  }, [icone]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.icone}>
          {icon && <View>{icon}</View>}
        </View>
        <View style={styles.informacoes}>
          <Text style={styles.texto}>{label}</Text>
          <Text>{informacao}</Text>
        </View>
      </View>
    </View>
  );
};

export default StatusCultura;
