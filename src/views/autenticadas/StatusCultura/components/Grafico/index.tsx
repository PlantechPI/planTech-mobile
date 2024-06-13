import React from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { CORES } from '../../../../../enum/Cores';

interface IGrafico {
  qtdNitrogenio: number,
  qtdPotassio: number,
  qtdFosforo: number,
}

const screenWidth = Dimensions.get('window').width;

const BarChartExample: React.FC<IGrafico> = ({ qtdNitrogenio, qtdPotassio, qtdFosforo }) => {

  const data = {
    labels: ['NITROGÊNIO', 'POTÁSSIO', 'FÓSFORO'],
    datasets: [
      {
        data: [
          qtdNitrogenio ? qtdNitrogenio : 0,
          qtdPotassio ? qtdPotassio : 0,
          qtdFosforo ? qtdFosforo : 0],
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
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
    propsForBackgroundLines: {
      stroke: '#E3E3E3',
      strokeDasharray: '',
      strokeWidth: 1,
      opacity: 1,
    },
    propsForLabels: {
      fontSize: 12,
      fill: CORES.verde,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      textAnchor: 'middle',
    },
    propsForHorizontalLabels: {
      fontSize: 12,
      fill: CORES.primaria,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      textAnchor: 'end',
    },
  };

  return (
    <ScrollView>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
          Situação Atual da Química do Solo
        </Text>
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
          fromZero={true}
          yAxisInterval={1}
          withInnerLines={false}
          showBarTops={true}
          showValuesOnTopOfBars={true}
        />
      </View>
    </ScrollView>
  );
};

export default BarChartExample;
