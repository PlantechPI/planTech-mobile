import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import Card from './components/Card';
import { CORES } from '../../../../enum/Cores'; // Assumindo que há um arquivo de constantes para as cores

interface IData {
  tempSolo: number;
  fosforoSolo: number;
  nitrogenioSolo: number;
  potassioSolo: number;
  umidadeAr: number;
  umidadeSolo: number;
  tempMax: number;
  horaDado: string;
}

interface IDetalharHora {
  data: IData;
}

const DetalharHora: React.FC = () => {
  const route = useRoute();
  const { data } = route.params as IDetalharHora;

  return (
    <ScrollView>
        <View style={styles.tituloPrincipal}>
          <View>
            <Text style={styles.titulo}> Detalhes da hora: {data.horaDado} </Text>
          </View>
      </View>
      <View style={styles.cards}>

        <Card
          icone={{ nomeIcon: 'thermometer', directory: 'MaterialCommunityIcons' }}
          label={'TEMPERATURA ATUAL'}
          informacao={String(data.tempSolo).concat('°C')}
          modal={{
            title: 'Temperatura Atual (°C)',
            text: 'A temperatura atual refere-se à leitura da temperatura do ar em um momento específico, no caso medida em graus Celsius (°C). Esta medida é crucial para diversos aspectos da vida cotidiana, incluindo agricultura, saúde, planejamento urbano e atividades ao ar livre. No contexto agrícola, a temperatura atual é um indicador vital que influencia diretamente o crescimento e desenvolvimento das plantas.'
            }}
        />
        <Card
          icone={{ nomeIcon: 'thermometer-chevron-up', directory: 'MaterialCommunityIcons' }}
          label={'TEMPERATURA MÁXIMA'}
          informacao={String(data.tempMax).concat('°C')}
          modal={{
            title: 'Temperatura Máxima (°C)',
            text: 'A temperatura máxima é a leitura mais alta da temperatura do ar durante o dia. Este dado é importante para a agricultura, pois temperaturas muito altas podem causar estresse térmico nas plantas, afetando negativamente seu crescimento e produtividade. Monitorar a temperatura máxima ajuda a adotar medidas de proteção, como sombreamento e irrigação.'
            }}
            />
        <Card
          icone={{ nomeIcon: 'thermometer', directory: 'MaterialCommunityIcons' }}
          label={'TEMPERATURA DO SOLO'}
          informacao={String(data.tempSolo).concat('°C')}
          modal={{
            title: 'Temperatura do Solo (°C)',
            text: 'A temperatura do solo é a medida de calor no solo, influenciada pela temperatura do ar, radiação solar e umidade. É crucial para processos como germinação de sementes e atividade microbiana. Temperaturas extremas podem afetar negativamente o crescimento das plantas e a disponibilidade de nutrientes. A faixa considerada ideal é entre 20°C e 30°C. Valores fora dessa faixa não são recomendados.'
            }}
            />
        <Card
          icone={{ nomeIcon: 'chemical-weapon', directory: 'MaterialCommunityIcons' }}
          label={'NITROGÊNIO'}
          informacao={String(data.nitrogenioSolo).concat('mg/kg')}
          modal={{
            title: 'Nitrogênio (mg/kg)',
            text: 'O nitrogênio é um nutriente essencial para o crescimento das plantas, vital para a formação de proteínas e clorofila. Níveis adequados de nitrogênio promovem um crescimento vigoroso e produtivo, enquanto deficiências podem causar folhas amareladas e baixo rendimento. A faixa considerada ideal é entre 15 mg/kg e 40 mg/kg. Valores fora dessa faixa não são recomendados.'
            }}
            />
        <Card
          icone={{ nomeIcon: 'air', directory: 'MaterialIcons' }}
          label={'UMIDADE DO AR'}
          informacao={String(data.umidadeAr).concat('%')}
          modal={{
            title: 'Umidade do Ar (%)',
            text: 'A umidade do ar é a quantidade de vapor de água presente no ar, expressa em porcentagem (%). Na agricultura, a umidade do ar afeta a transpiração das plantas e a evaporação do solo. Níveis ótimos de umidade ajudam a manter o equilíbrio hídrico das plantas, enquanto níveis extremos podem causar estresse hídrico ou favorecer doenças.'
            }}
            />
        <Card
          icone={{ nomeIcon: 'water', directory: 'MaterialCommunityIcons' }}
          label={'UMIDADE DO SOLO'}
          informacao={String(data.umidadeSolo).concat('%')}
          modal={{
            title: 'Umidade do Solo (%)',
            text: 'A umidade do solo é a quantidade de água presente no solo, vital para o crescimento das plantas. Ela influencia a absorção de nutrientes e o desenvolvimento das raízes. Níveis inadequados de umidade podem causar estresse hídrico, afetando negativamente o crescimento e a saúde das plantas. A faixa considerada ideal é entre 50% e 90%. Valores fora dessa faixa não são recomendados.'
            }}
            />
        <Card
          icone={{ nomeIcon: 'pill', directory: 'MaterialCommunityIcons' }}
          label={'POTÁSSIO'}
          informacao={String(data.potassioSolo).concat('mg/kg')}
          modal={{
            title: 'Potássio (mg/kg)',
            text: 'O potássio é um nutriente essencial que ajuda na resistência das plantas a doenças, regulação da abertura dos estômatos e síntese de proteínas. Níveis adequados de potássio melhoram a qualidade dos frutos e a resistência ao estresse. Deficiências podem causar folhas amareladas e produtividade reduzida. A faixa considerada ideal é entre 100 mg/kg e 150 mg/kg. Valores fora dessa faixa não são recomendados.'
            }}
        />
        <Card
          icone={{ nomeIcon: 'flask-outline', directory: 'MaterialCommunityIcons' }}
          label={'FÓSFORO'}
          informacao={String(data.fosforoSolo).concat('mg/kg')}
          modal={{
            title: 'Fósforo (mg/kg)',
            text: 'O fósforo é crucial para o desenvolvimento das raízes e a floração das plantas. Ele ajuda na transferência de energia e na formação de sementes e frutos. Níveis adequados de fósforo promovem um crescimento saudável e uma colheita abundante, enquanto deficiências podem resultar em crescimento atrofiado e baixo rendimento. A faixa considerada ideal é entre 15 mg/kg e 50 mg/kg. Valores fora dessa faixa não são recomendados.'
            }}
            />
      </View>
    </ScrollView>
  );
};

export default DetalharHora;
