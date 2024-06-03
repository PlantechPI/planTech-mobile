import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { CORES } from '../../../../../enum/Cores';

interface ICardStatusCultura {
  informacao: string;
  icone?: {
    nomeIcon: keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof MaterialIcons.glyphMap;
    directory: string;
    color?: string;
  };
  label?: string;
  modal?: {
    title?: string,
    text?: string,

  }
}

const StatusCultura: React.FC<ICardStatusCultura> = ({ informacao, icone, label, modal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (icone?.directory === 'MaterialCommunityIcons' && icone?.nomeIcon) {
      setIcon(<MaterialCommunityIcons name={icone.nomeIcon} size={26} color={icone.color ? icone.color : CORES.verdeClaro}/>);
    }else if(icone?.directory === 'MaterialIcons' && icone?.nomeIcon){
      setIcon(<MaterialIcons name={icone.nomeIcon} size={26} color={icone.color ? icone.color : CORES.verdeClaro}/>);
    }
    // Adicione outras condições para outras bibliotecas de ícones aqui
  }, [icone]);

  return (
    <>
    <TouchableOpacity onPress={() => setIsVisible(true)}>
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
     
          <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{modal?.title}</Text>
              <Text>{modal?.text}</Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text style={styles.closeButton}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </>
    
  );
};

export default StatusCultura;
