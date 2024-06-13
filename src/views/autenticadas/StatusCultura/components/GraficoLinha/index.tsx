import React, {useContext, useEffect, useState} from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { CORES } from '../../../../../enum/Cores';
import AuthContext from '../../../../../context/auth';



const screenWidth = Dimensions.get('window').width;

const LineChartExemple: React.FC = () => {
  const { listarInformacoesDiarias, evapoDoDia } = useContext(AuthContext);

  const [ evapos, setEvapos] = useState<number[]>([])
  const [ datas, setDatas] = useState<string[]>([])

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return (`${day}/${month}/${year}`);
  };

  const montaInformacoes = async(currentData:string, dataDiaMes:string) =>{
    

    const evapoDodia = await evapoDoDia(currentData);
    const evapoFormatada = evapoDodia.ETO
    setEvapos(old => [...old, evapoFormatada])
    setDatas(old => [...old, dataDiaMes])
  }

  useEffect(() =>{
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      const dataDiaMes = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`

      
      montaInformacoes(formattedDate, dataDiaMes)
    }
  }, [])




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
  };

  const data = {
    labels: datas.reverse(),
    datasets: [
      {
        data: evapos.reverse(),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      },
      // {
      //   data: [10, 30, 50, 70, 90, 60],
      //   color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
      //   strokeWidth: 2
      // }
    ],
  };

  return (
    <>
    { datas?.length < 6 ? (
      null
      ) : (
        <ScrollView>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
          Evapotranspiração nos ultimos dias
        </Text>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          />
      </View>
    </ScrollView>
    )}
  </>
    
  );
};

export default LineChartExemple;
