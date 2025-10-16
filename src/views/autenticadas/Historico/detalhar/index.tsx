import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import AuthContext from '../../../../context/auth';
import { Octicons } from '@expo/vector-icons';
import NotFound from '../../../../components/NotFound';
import { Skeleton } from '../../StatusCultura/components/Skeleton';
import Card from './components/Card';
import { CORES } from '../../../../enum/Cores';
import GraficoDeLinha from './components/GraficoLinha';
import CardTelaToda from './components/CardTelaToda';

const HistoricoDetalhado: React.FC = () => {
  const { id_miniestacao, listarInformacoesDiariasData, listarTodasInformacoesDiariasData } =
    useContext(AuthContext);
  const route = useRoute();

  const data = route.params?.data;

  const [boletim, setBoletim] = useState<any>(null);
  const [dadosBrutos, setDadosBrutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [existeDado, setExisteDado] = useState(true);

  const [visibleDadosGerais, setVisibleDadosGerais] = useState(true);
  const [visibilidadeGraficos, setVisibleDadosGraficos] = useState(true);
  const [visibilidadeLogs, setVisibilidadeLogs] = useState(true);

  const recuperarInfos = async () => {
    try {
      setLoading(true);
      const [dia, mes, ano] = data.split('/');
      const dataFormatada = `${ano}-${mes}-${dia}`;

      // 🔹 1. Busca o boletim (médias do dia)
      const boletimRes = await listarInformacoesDiariasData(id_miniestacao, dataFormatada);
      console.log('📦 Boletim diário:', boletimRes);

      // 🔹 2. Busca os dados brutos (todos sensores do dia)
      const dadosRes = await listarTodasInformacoesDiariasData(id_miniestacao, dataFormatada);
      console.log('📊 Dados brutos:', dadosRes);

      if (boletimRes && Object.keys(boletimRes).length > 0) {
        setBoletim(boletimRes);
        setExisteDado(true);
      } else {
        setExisteDado(false);
      }

      if (dadosRes && dadosRes.length > 0) {
        setDadosBrutos(dadosRes);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do dia:', error);
      setExisteDado(false);
    } finally {
      setLoading(false);
      }
      
    
      

  };

  useEffect(() => {
    recuperarInfos();
  }, []);

  if (!existeDado) return <NotFound />;

  if (loading) return <Skeleton />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cards}>
        {/* === MÉDIAS DO DIA === */}
        <View style={styles.tituloSecundario}>
          <View style={{ width: '90%' }}>
            <Text style={styles.textTitulo}> MÉDIAS DO DIA {data}</Text>
          </View>
          <View style={{ width: '10%' }}>
            <TouchableOpacity onPress={() => setVisibleDadosGerais((prev) => !prev)}>
              <Text style={styles.textTitulo}>
                {visibleDadosGerais ? (
                  <Octicons name="chevron-down" size={26} />
                ) : (
                  <Octicons name="chevron-up" size={26} />
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {visibleDadosGerais && boletim && (
          <>
            <Card
              icone={{ nomeIcon: 'thermometer', directory: 'MaterialCommunityIcons' }}
              label="TEMPERATURA MÉDIA DO AR"
              informacao={`${boletim['temperatura_do_ar_med']}°C`}
            />
            <Card
              icone={{ nomeIcon: 'thermometer-chevron-up', directory: 'MaterialCommunityIcons' }}
              label="TEMPERATURA MÁXIMA DO AR"
              informacao={`${boletim['temperatura_do_ar_max']}°C`}
            />
            <Card
              icone={{ nomeIcon: 'thermometer-chevron-down', directory: 'MaterialCommunityIcons' }}
              label="TEMPERATURA MÍNIMA DO AR"
              informacao={`${boletim['temperatura_do_ar_min']}°C`}
            />
            <Card
              icone={{ nomeIcon: 'weather-pouring', directory: 'MaterialCommunityIcons' }}
              label="PRECIPITAÇÃO"
              informacao={`${boletim['precipitação_med']} mm`}
            />
            <Card
              icone={{ nomeIcon: 'air', directory: 'MaterialIcons' }}
              label="UMIDADE DO AR"
              informacao={`${boletim['umidade_do_ar_med']}%`}
            />
            <Card
              icone={{
                nomeIcon: 'elevation-decline',
                directory: 'MaterialCommunityIcons',
                color:
                  boletim['temperatura_do_solo_med'] > 20 &&
                  boletim['temperatura_do_solo_med'] < 30
                    ? CORES.verdeClaro
                    : 'red',
              }}
              label="TEMPERATURA DO SOLO"
              informacao={`${boletim['temperatura_do_solo_med']}°C`}
            />
            <Card
              icone={{ nomeIcon: 'water', directory: 'MaterialCommunityIcons' }}
              label="UMIDADE DO SOLO"
              informacao={`${boletim['umidade_do_solo_med']}%`}
            />
            <Card
              icone={{ nomeIcon: 'pine-tree-fire', directory: 'MaterialCommunityIcons' }}
              label="EVAPOTRANSPIRAÇÃO"
              informacao={`${boletim['evapotranspiração_total']} mm`}
            />
            <Card
              icone={{ nomeIcon: 'flask-outline', directory: 'MaterialCommunityIcons' }}
              label="FÓSFORO"
              informacao={`${boletim['fósforo do solo_med']} mg/kg`}
            />
            <Card
              icone={{ nomeIcon: 'chemical-weapon', directory: 'MaterialCommunityIcons' }}
              label="NITROGÊNIO"
              informacao={`${boletim['nitrogênio do solo_med']} mg/kg`}
            />
            <Card
              icone={{ nomeIcon: 'pill', directory: 'MaterialCommunityIcons' }}
              label="POTÁSSIO"
              informacao={`${boletim['potássio do solo_med']} mg/kg`}
            />
            <Card
              icone={{ nomeIcon: 'beaker-outline', directory: 'MaterialCommunityIcons' }}
              label="pH DO SOLO"
              informacao={`${boletim['ph do solo_med']}`}
            />
          </>
        )}

        {/* === GRÁFICOS === */}
        <View style={styles.tituloSecundario}>
          <View style={{ width: '90%' }}>
            <Text style={styles.textTitulo}> GRÁFICOS </Text>
          </View>
          <View style={{ width: '10%' }}>
            <TouchableOpacity onPress={() => setVisibleDadosGraficos((prev) => !prev)}>
              <Text style={styles.textTitulo}>
                {visibilidadeGraficos ? (
                  <Octicons name="chevron-down" size={26} />
                ) : (
                  <Octicons name="chevron-up" size={26} />
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {visibilidadeGraficos && boletim && (
          <View>
            <GraficoDeLinha
              data={{
                labels: ['Ar Máx', 'Ar Méd', 'Ar Mín', 'Solo Méd'],
                datasets: [
                  {
                    data: [
                      boletim['temperatura_do_ar_max'],
                      boletim['temperatura_do_ar_med'],
                      boletim['temperatura_do_ar_min'],
                      boletim['temperatura_do_solo_med'],
                    ],
                    color: () => CORES.primaria,
                    strokeWidth: 2,
                  },
                ],
              }}
            />
          </View>
        )}

        {/* === LOGS (dados brutos dos sensores) === */}
        <View style={styles.tituloSecundario}>
          <View style={{ width: '90%' }}>
            <Text style={styles.textTitulo}> DADOS BRUTOS DOS SENSORES </Text>
          </View>
          <View style={{ width: '10%' }}>
            <TouchableOpacity onPress={() => setVisibilidadeLogs((prev) => !prev)}>
              <Text style={styles.textTitulo}>
                {visibilidadeLogs ? (
                  <Octicons name="chevron-down" size={26} />
                ) : (
                  <Octicons name="chevron-up" size={26} />
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {visibilidadeLogs && (
          <View style={styles.centro}>
            {dadosBrutos.map((item, index) => (
              <CardTelaToda
                key={index}
                icone={{
                  nomeIcon: 'database',
                  directory: 'MaterialCommunityIcons',
                  color: CORES.verdeClaro,
                }}
                label={item.nomeSensor}
                informacao={`Média: ${item.valorMed ?? '--'} | Máx: ${item.valorMax ?? '--'} | Mín: ${item.valorMin ?? '--'}`}
                data={item}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HistoricoDetalhado;
