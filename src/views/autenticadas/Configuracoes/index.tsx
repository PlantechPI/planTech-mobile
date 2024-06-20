import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import styles from './styles';
import ButtonComponent from '../../../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { CORES } from '../../../enum/Cores';
import AuthContext from '../../../context/auth';
import TextInputComponent from '../../../components/TextInputIcon';
import CardTotal from './components/CardTelaToda'; // Adjust the import path if necessary

const Configuracoes = () => {
  const navigation = useNavigation();
  const { getDadosIrrigacao, irrigar } = useContext(AuthContext);

  const [carregando, setCarregando] = useState(true);
  const [potassio, setPotassio] = useState<string>('');
  const [dadosIrrigacao, setDadosIrrigacao] = useState<any>(null);

  const handleGetDadosIrrigacao = async () => {
    try {
      const data = await getDadosIrrigacao(new Date().toLocaleDateString('pt-BR'));
      setDadosIrrigacao(data);
      setCarregando(false);
      console.log(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter os dados de irrigação.');
      setCarregando(false);
    }
  };

  const handleIrrigar = async () => {
    try {
      const response = await irrigar();
      Alert.alert('Irrigação', 'Irrigação realizada com sucesso.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a irrigação.');
    }
  };

  useEffect(() => {
    handleGetDadosIrrigacao();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tituloPrincipal}>
        <View>
          <Text style={styles.titulo}>IRRIGAÇÃO</Text>
        </View>
      </View>
      {dadosIrrigacao ? (
        <>
          <CardTotal
            informacao={String(dadosIrrigacao.dias_fosforo)}
            icone={{ nomeIcon: 'abacus', directory: 'MaterialCommunityIcons' }}
            label="Dias Fósforo"
          />
          <CardTotal
            informacao={String(dadosIrrigacao.dias_nitrogenio)}
            icone={{ nomeIcon: 'barley', directory: 'MaterialCommunityIcons' }}
            label="Dias Nitrogênio"
          />
          <CardTotal
            informacao={String(dadosIrrigacao.dias_potassio)}
            icone={{ nomeIcon: 'fire', directory: 'Fontisto' }}
            label="Dias Potássio"
          />
          <CardTotal
            informacao={String(dadosIrrigacao.media_umidade)}
            icone={{ nomeIcon: 'beer-outline', directory: 'MaterialCommunityIcons' }}
            label="Média Umidade"
          />
          <CardTotal
            informacao={String(dadosIrrigacao.necessidade_agua)}
            icone={{ nomeIcon: 'water-percent', directory: 'MaterialCommunityIcons' }}
            label="Necessidade Água"
          />
          <CardTotal
            informacao={String(dadosIrrigacao.npk)}
            icone={{ nomeIcon: 'chart-bar', directory: 'MaterialCommunityIcons' }}
            label="NPK"
          />
          <View style={[styles.formView, {marginBottom:20}]}>
            <ButtonComponent
              textoBtn="Irrigar"
              onPress={handleIrrigar}
              backGroundColor={CORES.primaria}
            />
          </View>
        </>
      ) : (
        carregando && <Text>Carregando dados de irrigação...</Text>
      )}
    </ScrollView>
  );
};

export default Configuracoes;
