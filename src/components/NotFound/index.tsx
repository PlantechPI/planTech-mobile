import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const CardHistorico: React.FC = ({}) => {
  const navigation = useNavigation();

  return (
      <View style={styles.container}>
        <MaterialIcons name="error-outline" size={60}/>
        <Text style={styles.box}>
          <Text style={styles.text}>Ops, não existem dados desse dia</Text>
        </Text>
      </View>
  );
};

export default CardHistorico;
