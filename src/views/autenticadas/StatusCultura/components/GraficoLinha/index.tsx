import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { CORES } from '../../../../../enum/Cores';
import AuthContext from '../../../../../context/auth';

const screenWidth = Dimensions.get('window').width;

const LineChartExemple: React.FC = () => {
  const { listarInformacoesDiarias, id_miniestacao } = useContext(AuthContext);

  const [evapos, setEvapos] = useState<number[]>([]);
  const [datas, setDatas] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);

  // 🗓️ Função auxiliar para formatar data no formato dd/mm/yyyy
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // 🔹 Buscar dados dos últimos 7 dias
  const carregarDados = async () => {
    try {
      const novasEvapos: number[] = [];
      const novasDatas: string[] = [];

      for (let i = 6; i >= 0; i--) {
        const data = new Date();
        data.setDate(data.getDate() - i);
        const dataLabel = `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1)
          .toString()
          .padStart(2, '0')}`;

        // 🔸 Chama a rota que já retorna evapotranspiração junto com os outros sensores
        const res = await listarInformacoesDiarias(id_miniestacao);

        if (res && res.dados && res.dados["Evapotranspiração"]) {
          const valorEvapo = res.dados["Evapotranspiração"].valorAbsoluto ?? 0;
          novasEvapos.push(Number(valorEvapo.toFixed(2)));
          novasDatas.push(dataLabel);
        } else {
          // Se não houver dado para o dia, adiciona 0
          novasEvapos.push(0);
          novasDatas.push(dataLabel);
        }
      }

      setEvapos(novasEvapos);
      setDatas(novasDatas);
    } catch (error) {
      console.log("Erro ao carregar evapotranspiração:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

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
      textAnchor: 'middle' as const,
    },
    propsForHorizontalLabels: {
      fontSize: 12,
      fill: CORES.primaria,
      fontFamily: 'Arial',
      fontWeight: 'normal',
      textAnchor: 'end',
    },
  };

  const data = {
    labels: datas,
    datasets: [
      {
        data: evapos,
        color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <>
      {carregando ? null : (
        <ScrollView horizontal={true}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                marginVertical: 10,
              }}
            >
              Evapotranspiração nos últimos dias
            </Text>
            <LineChart
              data={data}
              width={screenWidth + 60}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default LineChartExemple;
