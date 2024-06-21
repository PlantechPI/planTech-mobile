import React, { useState } from 'react';
import { View, Dimensions, Text, ScrollView } from 'react-native';
import { LineChart  } from 'react-native-chart-kit';
import { CORES } from '../../../../../../enum/Cores';

const screenWidth = Dimensions.get('window').width;

interface IGraficoDeLinha {
  data: any;
}

const LineChartExemple: React.FC<IGraficoDeLinha> = ({ data }) => {


  const chartConfig = {
    backgroundGradientFrom: '#FFF',
    backgroundGradientFromOpacity: 4,
    backgroundGradientTo: CORES.branco,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => CORES.verde,
    strokeWidth: 3,
    barPercentage: 1,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      stroke: '#E3E3E3',
      strokeDasharray: '',
      strokeWidth: 1,
      opacity: 1,
    },
    propsForLabels: {
      fontSize: 8,
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
    propsForVerticalLabels: {
      // display: 'none', // Remove as linhas verticais
    },
  };
  

  const separaPorHora = (horas: string[]) => {
    let ultimoHora = -1; // Inicializa com um valor que não interfere no primeiro valor
    const horasFiltradas = horas.map((hora) => {
      const [hh] = hora.split(':').map(Number); // Extrai a hora do timestamp
  
      // Verifica se é uma nova hora completa para exibir
      const mostrar = ultimoHora !== hh && hh % 2 ==0;
      ultimoHora = hh; // Atualiza a última hora exibida
  
      return mostrar ? `${hh}:00` : ''; // Retorna no formato "HH:00" se for uma nova hora
    });
  
    return horasFiltradas; // Filtra para remover strings vazias
  };

  const horas = data.labels.map((hora: string) => hora.split(':')[0]); // Extrai apenas as horas

  const labels = separaPorHora(horas); // Chama a função para formatar as horas


  return (
    <ScrollView>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
          Variação da temperatura no dia
        </Text>
        <LineChart
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        data: data.datasets[0].data, 
                        color: () => chartConfig.color(), // Cor da linha
                        strokeWidth: chartConfig.strokeWidth, // Espessura da linha
                      },
                    ],
                  }}
          width={screenWidth}
          height={260}
          chartConfig={chartConfig}
          withDots={false} // Remove as bolinhas dos dados
          showGrid={true}
          yAxisSuffix="ºC"
          // verticalLabelRotation={0}
          // yAxisInterval={1}
          withInnerLines={false}
        />
        
      </View>
    </ScrollView>
  );
};

export default LineChartExemple;
