import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from './styles/index'
import { Ionicons } from '@expo/vector-icons';

interface IPopUp {
    title?: string;
    text?: string;
  }

const Popup:React.FC<IPopUp> = ({ title, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Ionicons name="information-circle-outline" size={24} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text>{text}</Text>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text style={styles.closeButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Popup;
