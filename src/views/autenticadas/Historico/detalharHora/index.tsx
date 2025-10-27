import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import Card from './components/Card';
import { CORES } from '../../../../enum/Cores';

interface IData {
  ar: {
    'Temperatura do Ar'?: { valorMin: number | null; valorMed: number | null; valorMax: number | null };
    'Umidade do Ar'?: { valorMin: number | null; valorMed: number | null; valorMax: number | null };
  };
  solo: {
    'Temperatura do Solo'?: { valorMin: number | null; valorMed: number | null; valorMax: number | null };
    'Umidade do Solo'?: { valorMin: number | null; valorMed: number | null; valorMax: number | null };
    'Fósforo do Solo'?: { valorAbsoluto: number | null };
    'Nitrogênio do Solo'?: { valorAbsoluto: number | null };
    'Potássio do Solo'?: { valorAbsoluto: number | null };
    'pH do Solo'?: { valorAbsoluto: number | null };
    'Condutividade do Solo'?: { valorAbsoluto: number | null };
  };
  agua?: {
    Evapotranspiração?: { valorAbsoluto: number | null };
    Precipitação?: { valorAbsoluto: number | null };
  };
  horaDado: string;
}

interface IDetalharHora {
  data: IData;
}

const DetalharHora: React.FC = () => {
  const route = useRoute();
  const { data } = route.params as IDetalharHora;

  const formatarValoresSensor = (sensor: any, unidade: string = '') => {
    if (!sensor) return 'N/A';
    const min = sensor.valorMin ?? 'N/A';
    const med = sensor.valorMed ?? 'N/A';
    const max = sensor.valorMax ?? 'N/A';
    return `Mínima: ${min}${unidade}\nMédia: ${med}${unidade}\nMáxima: ${max}${unidade}`;
  };

  const formatarValorAbsoluto = (sensor: any, unidade: string = '') => {
    if (!sensor) return 'N/A';
    return `${sensor.valorAbsoluto ?? 'N/A'}${unidade}`;
  };

  return (
    <ScrollView>
      <View style={styles.tituloPrincipal}>
        <Text style={styles.titulo}>Detalhes da hora: {data.horaDado}</Text>
      </View>

      <View style={styles.subtituloPrincipal}>
        <Text style={styles.subtitulo}>Água</Text>
      </View>
      <View style={styles.cards}>
        <Card
          icone={{ nomeIcon: 'weather-pouring', directory: 'MaterialCommunityIcons' }}
          label="PRECIPITAÇÃO"
          informacao={formatarValorAbsoluto(data.agua?.Precipitação, ' mm')}
          modal={{
            title: 'Precipitação (mm)',
            text: 'A precipitação representa a quantidade de água da chuva que caiu em um período específico. Este dado é fundamental para entender a disponibilidade de água para as culturas e planejar a irrigação.'
          }}
        />
        <Card
          icone={{ nomeIcon: 'water', directory: 'MaterialCommunityIcons' }}
          label="EVAPOTRANSPIRAÇÃO"
          informacao={formatarValorAbsoluto(data.agua?.Evapotranspiração, ' mm')}
          modal={{
            title: 'Evapotranspiração (mm)',
            text: 'Evapotranspiração é a soma da evaporação do solo e da transpiração das plantas. Esse valor indica a quantidade de água que deve ser reposta para manter a umidade ideal do solo.'
          }}
        />

        <View style={styles.subtituloPrincipal}>
          <Text style={styles.subtitulo}>Ar</Text>
        </View>
        <Card
          icone={{ nomeIcon: 'thermometer', directory: 'MaterialCommunityIcons' }}
          label="TEMPERATURA DO AR"
          informacao={formatarValoresSensor(data.ar['Temperatura do Ar'], ' °C')}
          modal={{
            title: 'Temperatura do Ar (°C)',
            text: 'A temperatura do ar influencia diretamente o crescimento das plantas, evapotranspiração e processos fisiológicos. Monitorar a temperatura ajuda a proteger a cultura contra estresses térmicos.'
          }}
        />
        <Card
          icone={{ nomeIcon: 'air', directory: 'MaterialIcons' }}
          label="UMIDADE DO AR"
          informacao={formatarValoresSensor(data.ar['Umidade do Ar'], '%')}
          modal={{
            title: 'Umidade do Ar (%)',
            text: 'A umidade do ar afeta a transpiração das plantas e a evaporação do solo. Manter níveis adequados ajuda a reduzir estresse hídrico e o risco de doenças.'
          }}
        />

        <View style={styles.subtituloPrincipal}>
          <Text style={styles.subtitulo}>Solo</Text>
        </View>
        <Card
          icone={{ nomeIcon: 'elevation-decline', directory: 'MaterialCommunityIcons' }}
          label="TEMPERATURA DO SOLO"
          informacao={formatarValoresSensor(data.solo['Temperatura do Solo'], ' °C')}
          modal={{
            title: 'Temperatura do Solo (°C)',
            text: 'A temperatura do solo influencia a germinação, crescimento radicular e atividade microbiana. Manter faixas ideais garante o desenvolvimento saudável das plantas.'
          }}
        />
        <Card
          icone={{ nomeIcon: 'water', directory: 'MaterialCommunityIcons' }}
          label="UMIDADE DO SOLO"
          informacao={formatarValoresSensor(data.solo['Umidade do Solo'], '%')}
          modal={{
            title: 'Umidade do Solo (%)',
            text: 'A umidade do solo é vital para a absorção de nutrientes e crescimento das plantas. Valores fora da faixa ideal podem causar estresse hídrico ou redução da produtividade.'
          }}
        />
        <Card
          icone={{ nomeIcon: 'flask-outline', directory: 'MaterialCommunityIcons' }}
          label="FÓSFORO"
          informacao={formatarValorAbsoluto(data.solo['Fósforo do Solo'], ' mg/kg')}
          modal={{
            title: 'Fósforo (mg/kg)',
            text: 'O fósforo é essencial para o desenvolvimento das raízes, floração e produção de sementes. Níveis ideais promovem crescimento saudável e maior produtividade.'
          }}
        />
        <Card
          icone={{ nomeIcon: 'chemical-weapon', directory: 'MaterialCommunityIcons' }}
          label="NITROGÊNIO"
          informacao={formatarValorAbsoluto(data.solo['Nitrogênio do Solo'], ' mg/kg')}
          modal={{
            title: 'Nitrogênio (mg/kg)',
            text: 'O nitrogênio é crucial para a formação de proteínas e clorofila. Níveis adequados promovem crescimento vigoroso, enquanto deficiências podem causar folhas amareladas.'
          }}
        />
        <Card
          icone={{ nomeIcon: 'pill', directory: 'MaterialCommunityIcons' }}
          label="POTÁSSIO"
          informacao={formatarValorAbsoluto(data.solo['Potássio do Solo'], ' mg/kg')}
          modal={{
            title: 'Potássio (mg/kg)',
            text: 'O potássio ajuda na resistência a doenças, regulação de estômatos e qualidade dos frutos. Níveis ideais aumentam a produtividade e resistência ao estresse.'
          }}
        />
        <Card
          icone={{ nomeIcon: 'beaker-outline', directory: 'MaterialCommunityIcons' }}
          label="PH"
          informacao={formatarValorAbsoluto(data.solo['pH do Solo'])}
          modal={{
            title: 'pH do Solo',
            text: 'O pH do solo influencia a disponibilidade de nutrientes e crescimento das plantas. Valores adequados são essenciais para a absorção eficiente de nutrientes.'
          }}
        />
        <Card
          icone={{ nomeIcon: 'beaker-outline', directory: 'MaterialCommunityIcons' }}
          label="CONDUTIVIDADE ELÉTRICA"
          informacao={formatarValorAbsoluto(data.solo['Condutividade do Solo'])}
          modal={{
            title: 'Condutividade Elétrica do Solo',
            text: 'A condutividade elétrica indica a quantidade de sais presentes no solo. Valores ideais favorecem a absorção de nutrientes e o crescimento saudável das plantas.'
          }}
        />
      </View>
    </ScrollView>
  );
};

export default DetalharHora;
