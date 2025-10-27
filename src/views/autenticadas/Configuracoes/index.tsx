import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert, ScrollView, Modal, TouchableOpacity } from 'react-native';
import styles from './styles';
import ButtonComponent from '../../../components/ButtonComponent';
import { CORES } from '../../../enum/Cores';
import AuthContext from '../../../context/auth';
import CardTotal from './components/CardTelaToda';
import { Skeleton } from './components/Skeleton';
import { ActivityIndicator } from 'react-native';

const Configuracoes = () => {
  const { getDadosIrrigacao, irrigar, id_miniestacao, loadingIrrigacao } = useContext(AuthContext);

  const [carregando, setCarregando] = useState(true);
  const [dadosIrrigacao, setDadosIrrigacao] = useState<any>(null);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleGetDadosIrrigacao = async () => {
    try {
      setCarregando(true);
      const data = await getDadosIrrigacao(id_miniestacao);
      if (!data) throw new Error('Sem dados retornados');
      setDadosIrrigacao(data);
    } catch (error) {
      console.error('❌ Erro ao obter dados de irrigação:', error);
      Alert.alert('Erro', 'Não foi possível obter os dados de irrigação.');
    } finally {
      setCarregando(false);
    }
  };

  const handleIrrigar = async () => {
    try {
      const response = await irrigar(id_miniestacao);
      if (!response) throw new Error('Falha ao acionar irrigação');
      Alert.alert('Irrigação', 'Irrigação realizada com sucesso.');
    } catch (error) {
      console.error('❌ Erro ao efetuar irrigação:', error);
      Alert.alert('Erro', 'Não foi possível realizar a irrigação.');
    } finally {
      setIsConfirmVisible(false);
    }
  };

  useEffect(() => {
    if (id_miniestacao) handleGetDadosIrrigacao();
  }, [id_miniestacao]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tituloPrincipal}>
        <Text style={styles.titulo}>IRRIGAÇÃO</Text>
      </View>

      {carregando ? (
        <Skeleton />
      ) : dadosIrrigacao ? (
        <>
          <CardTotal
            informacao={`${dadosIrrigacao.quantidadeAgua.toFixed(2)} mm`}
            icone={{ nomeIcon: 'water', directory: 'MaterialCommunityIcons' }}
            label="Necessidade de Água"
            modal={{
              title: "Necessidade de Água",
              text: "Representa a quantidade total de água necessária (em mm) para irrigar adequadamente a cultura."
            }}
          />

          <CardTotal
            informacao={`${dadosIrrigacao.nitrogenioNecessario.toFixed(2)} g`}
            icone={{ nomeIcon: 'barley', directory: 'MaterialCommunityIcons' }}
            label="Nitrogênio Necessário"
            modal={{
              title: "Necessidade de Nitrogênio",
              text: "Indica a quantidade estimada de nitrogênio que a cultura precisa atualmente para manter um crescimento saudável."
            }}
          />

          <CardTotal
            informacao={`${dadosIrrigacao.fosforoNecessario.toFixed(2)} g`}
            icone={{ nomeIcon: 'abacus', directory: 'MaterialCommunityIcons' }}
            label="Fósforo Necessário"
            modal={{
              title: "Necessidade de Fósforo",
              text: "O fósforo é essencial para o desenvolvimento radicular e o florescimento. Este valor representa a quantidade necessária no momento."
            }}
          />

          <CardTotal
            informacao={`${dadosIrrigacao.potassioNecessario.toFixed(2)} g`}
            icone={{ nomeIcon: 'fire', directory: 'Fontisto' }}
            label="Potássio Necessário"
            modal={{
              title: "Necessidade de Potássio",
              text: "O potássio regula o equilíbrio hídrico e o fortalecimento da planta. Este valor mostra o quanto ainda é necessário."
            }}
          />

          <CardTotal
            informacao={dadosIrrigacao.irrigar === 1 ? "Sim" : "Não"}
            icone={{ nomeIcon: 'sprout', directory: 'MaterialCommunityIcons' }}
            label="Deve Irrigar?"
            modal={{
              title: "Status da Irrigação",
              text: "Indica se, de acordo com os dados atuais, é necessário realizar irrigação neste momento."
            }}
          />

          <View style={[styles.formView, { marginBottom: 20 }]}>
            <ButtonComponent
              textoBtn="Irrigar"
              onPress={() => setIsConfirmVisible(true)}
              backGroundColor={CORES.primaria}
            />
          </View>
        </>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Nenhum dado de irrigação disponível.
        </Text>
      )}

      {/* Modal de confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isConfirmVisible}
        onRequestClose={() => setIsConfirmVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirmar Irrigação</Text>
            <Text style={{ marginBottom: 20 }}>
              Isso irá acionar a irrigação de acordo com as recomendações do sistema.
              Deseja continuar?
            </Text>

            {/* Se estiver carregando, mostra o spinner; senão, mostra os botões */}
            {loadingIrrigacao ? (
              <ActivityIndicator size="large" color={CORES.primaria} />
            ) : (
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity onPress={() => setIsConfirmVisible(false)} style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleIrrigar} style={styles.confirmButton}>
                  <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Configuracoes;
