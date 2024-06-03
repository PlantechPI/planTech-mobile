import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { CORES } from '../../../../../enum/Cores';

interface IGrafico{
  qtdNitrogenio: number,
  qtdPotassio: number,
  qtdFosforo: number,
  qtdTempDoSolo: number
}

const screenWidth = Dimensions.get('window').width;

const BarChartExample:React.FC<IGrafico> = ({ qtdNitrogenio, qtdPotassio, qtdFosforo, qtdTempDoSolo}) => {

  const data = {
    labels: ['NITROGÊNIO', 'POTÁSSIO', 'FÓSFORO', 'TEMP SOLO'],
    datasets: [
      {
        data: [
          qtdNitrogenio ? qtdNitrogenio : 0,
          qtdPotassio ? qtdPotassio : 0,
          qtdFosforo ? qtdFosforo : 0,
          qtdTempDoSolo ? qtdTempDoSolo : 0],
      },
    ],
  };
  
  const chartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientFromOpacity: 4,
    backgroundGradientTo: CORES.branco,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => CORES.verde,
    strokeWidth: 3, // optional, default 3
    // barRadius: 20,
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
    propsForBackgroundLines: {
      stroke: '#E3E3E3', // Cor das linhas de fundo
      strokeDasharray: '', // Padrão sólido
      strokeWidth: 1, // Largura das linhas de fundo
      opacity: 1, // Opacidade das linhas de fundo
    },
    propsForLabels: {
      fontSize: 12, // Tamanho da fonte dos rótulos
      fill: CORES.verde, // Cor dos rótulos
      fontFamily: 'Arial', // Família da fonte dos rótulos
      fontWeight: 'bold', // Peso da fonte dos rótulos
      textAnchor: 'middle', // Ponto de ancoragem do texto
    },
    propsForHorizontalLabels: {
      fontSize: 12, // Tamanho da fonte dos rótulos horizontais
      fill: CORES.primaria, // Cor dos rótulos horizontais
      fontFamily: 'Arial', // Família da fonte dos rótulos horizontais
      fontWeight: 'normal', // Peso da fonte dos rótulos horizontais
      textAnchor: 'end', // Ponto de ancoragem do texto dos rótulos horizontais
    },
  };

  
  return (
    <ScrollView>
      <View>
        <BarChart
          style={{
            // marginVertical: 8,
            // borderRadius: 16,
          }}
          data={data}
          width={screenWidth}
          height={250}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero={true}  // Adicionado para começar do 0
          yAxisInterval={1}  // Intervalo no eixo Y
          withInnerLines={false}
          showBarTops={true}
          showValuesOnTopOfBars={true}
        />
      </View>
    </ScrollView>
  );
};

export default BarChartExample;
