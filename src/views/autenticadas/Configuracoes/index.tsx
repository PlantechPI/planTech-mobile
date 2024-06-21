import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert, ScrollView, Modal, TouchableOpacity } from 'react-native';
import styles from './styles';
import ButtonComponent from '../../../components/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { CORES } from '../../../enum/Cores';
import AuthContext from '../../../context/auth';
import CardTotal from './components/CardTelaToda'; // Ajuste o caminho de importação se necessário
import { Skeleton } from './components/Skeleton';

const Configuracoes = () => {
  const navigation = useNavigation();
  const { getDadosIrrigacao, irrigar } = useContext(AuthContext);

  const [carregando, setCarregando] = useState(true);
  const [dadosIrrigacao, setDadosIrrigacao] = useState<any>(null);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleGetDadosIrrigacao = async () => {
    try {
      const data = await getDadosIrrigacao(new Date().toLocaleDateString('pt-BR'));
      setDadosIrrigacao(data);
      setCarregando(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter os dados de irrigação.');
      setCarregando(false);
    }
  };

  const handleIrrigar = async () => {
    try {
      const response = await irrigar();
      Alert.alert('Irrigação', 'Irrigação realizada com sucesso.');
      setIsConfirmVisible(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a irrigação.');
    }
  };

  const openConfirmModal = () => {
    setIsConfirmVisible(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmVisible(false);
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
            modal={{
              title: "Dias do Ciclo de Fósforo",
              text: "Representa o número de dias até a planta consumir todo o Fósforo atual. O fósforo é essencial para a transferência de energia e fotossíntese das plantas. Manter um nível ótimo de fósforo garante um crescimento robusto e desenvolvimento das plantas. Essa conta é ajustada de acordo com cada cultura e é baseada em artigos da embrapa e do incaper"
            }}
          />
          <CardTotal
            informacao={String(dadosIrrigacao.dias_nitrogenio)}
            icone={{ nomeIcon: 'barley', directory: 'MaterialCommunityIcons' }}
            label="Dias Nitrogênio"
            modal={{
              title: "Dias do Ciclo de Nitrogênio",
              text: "Representa o número de dias até a planta consumir todo o Nitrogênio atual. O nitrogênio é um componente crítico para o crescimento das plantas, pois é uma parte importante da clorofila, o composto que as plantas usam na fotossíntese. Ciclos regulares de nitrogênio ajudam a promover uma folhagem saudável nas plantas. Essa conta é ajustada de acordo com cada cultura e é baseada em artigos da embrapa e do incaper"
            }}
          />
          <CardTotal
            informacao={String(dadosIrrigacao.dias_potassio)}
            icone={{ nomeIcon: 'fire', directory: 'Fontisto' }}
            label="Dias Potássio"
            modal={{
              title: "Dias do Ciclo de Potássio",
              text: "Representa o número de dias até a planta consumir todo o Potássio atual. O potássio regula o crescimento das plantas e é crucial para a absorção de água e ativação de enzimas. Garantir ciclos regulares de potássio ajuda as plantas a suportarem o estresse e a melhorar a qualidade da produção. Essa conta é ajustada de acordo com cada cultura e é baseada em artigos da embrapa e do incaper"
            }}
          />
          <CardTotal
            informacao={String(dadosIrrigacao.media_umidade).concat(' %')}
            icone={{ nomeIcon: 'beer-outline', directory: 'MaterialCommunityIcons' }}
            label="Média Umidade"
            modal={{
              title: "Média da Umidade do Solo",
              text: "Representa o nível médio de umidade do solo do dia. A umidade adequada do solo é vital para a absorção de nutrientes e a saúde das plantas. Monitorar e manter níveis ótimos de umidade previnem o estresse por seca e garantem um ambiente de crescimento saudável para as plantas."
            }}
          />
          <CardTotal
            informacao={String(dadosIrrigacao.necessidade_agua).concat(' mm')}
            icone={{ nomeIcon: 'water-percent', directory: 'MaterialCommunityIcons' }}
            label="Necessidade Água"
            modal={{
              title: "Necessidade de Água",
              text: "Representa a necessidade de água da cultura específica em mm. Compreender as necessidades hídricas ajuda na irrigação eficiente, prevenindo tanto a sub-irrigação quanto a irrigação excessiva, promovendo assim o uso sustentável da água e o crescimento ideal das culturas. Essa conta é ajustada de acordo com cada cultura e é baseada em artigos da embrapa e do incaper"
            }}
          />
          <CardTotal
            informacao={String(dadosIrrigacao.npk).concat(' mm')}
            icone={{ nomeIcon: 'chart-bar', directory: 'MaterialCommunityIcons' }}
            label="Necessidade de NPK"
            modal={{
              title: "Necessidade de NPK",
              text: "Este card fornece a necessidade atual de NPK (Nitrogênio, Fósforo e Potássio), ele é medido em mm. Níveis equilibrados de NPK são cruciais para a nutrição e o crescimento das plantas. O monitoramento regular garante que suas plantas recebam os nutrientes certos para um desenvolvimento saudável e produtivo. Essa conta é ajustada de acordo com cada cultura e é baseada em artigos da embrapa e do incaper"
            }}
          />
          <View style={[styles.formView, { marginBottom: 20 }]}>
            <ButtonComponent
              textoBtn="Irrigar"
              onPress={openConfirmModal}
              backGroundColor={CORES.primaria}
            />
          </View>
        </>
      ) : (
        carregando && <Skeleton />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={isConfirmVisible}
        onRequestClose={closeConfirmModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirmar Irrigação</Text>
            <Text>Isso irá irrigar a cultura com de acordo com a necessidade de água e npk. Tem certeza de que deseja realizar a irrigação?</Text>
            <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={closeConfirmModal} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleIrrigar} style={styles.confirmButton}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Configuracoes;
