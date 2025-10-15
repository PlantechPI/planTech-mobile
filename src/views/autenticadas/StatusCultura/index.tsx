import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';
import AuthContext from '../../../context/auth';
import { Octicons } from '@expo/vector-icons';
import Card from './components/Card';
import { CORES } from '../../../enum/Cores';
import BarChartExample from './components/Grafico';
import { Skeleton } from './components/Skeleton';
import LineChartExemple from './components/GraficoLinha';

const StatusCultura = () => {
  const { id_miniestacao, listarInformacoesDiarias } = useContext(AuthContext);
  const [ dataAtual, setDataAtual] = useState<string>('');
  const [ dadosAtuais, setDadosAtuais] = useState<any>({});

  const [ carregando, setCarregando] = useState(true)
  
  const [ currentEvapo, setCurrentEvapo] = useState<number>(0);
  const [ currentFosforo, setCurrentFosforo] = useState<number>(0);
  const [ currentNitrogenio, setCurrentNitrogenio] = useState<number>(0);
  const [ currentPotassio, setCurrentPotassio] = useState<number>(0);
  const [ currentTempSolo, setCurrentTempSolo] = useState<number>(0); 
  const [ currentUmidadeAr, setCurrentUmidadeAr] = useState<number>(0);
  const [ currentUmidadeSolo, setCurrentUmidadeSolo] = useState<number>(0);
  const [ currentTemp, setCurrentTemp] = useState<number>(0);
  const [ precipitacaoTotal, setPrecipitacaoTotal] = useState<number>(0);
  const [ tempMax, setTempMax] = useState<number>(0);
  const [ tempMin, setTempMin] = useState<number>(0);
  const [ ultimaAtualizacao, setUltimaAtualizacao] = useState<string>("");

  const [ visibleDadosGerais, setVisibleDadosGerais] = useState(true);
  const [ visibleDadosDoSolo, setVisibleDadosDoSolo] = useState(true);
  const [ visibleDadosGraficos, setVisibleDadosGraficos] = useState(true);
  
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return (`${day}/${month}/${year}`);
  };

  const recuperarDados = async () => {
    try {
      setCarregando(true);
      console.log("⏳ Recuperando dados...");

      const currentData = getCurrentDate();
      setDataAtual(currentData);

      const res = await listarInformacoesDiarias(id_miniestacao);
      console.log("📦 Dados recebidos:", res);

      if (res?.dados) {
        if (res.dados["Evapotranspiração"]) {
          setCurrentEvapo(res.dados["Evapotranspiração"].valorAbsoluto || 0);
        }

        // Atualiza os demais dados conforme necessário
        setDadosAtuais(res);
      } else {
        console.warn("⚠️ Nenhum dado encontrado para esta miniestação");
      }

    } catch (error) {
      console.error("💥 Erro ao recuperar dados:", error);
    } finally {
      setCarregando(false);
      console.log("✅ Recuperação finalizada");
    }
  };

  useEffect(() =>{
    recuperarDados();
  }, []);

  useEffect(() => {
    if (dadosAtuais && dadosAtuais.dados) {
      const sensores = dadosAtuais.dados;

      // Extraindo os valores diretamente do objeto retornado pela API
      setCurrentTempSolo(Number(sensores["Temperatura do Solo"]?.valorMed || 0));
      setCurrentUmidadeSolo(Number(sensores["Umidade do Solo"]?.valorMed || 0));
      setCurrentTemp(Number(sensores["Temperatura do Ar"]?.valorMed || 0));
      setTempMax(Number(sensores["Temperatura do Ar"]?.valorMax || 0));
      setTempMin(Number(sensores["Temperatura do Ar"]?.valorMin || 0));
      setCurrentUmidadeAr(Number(sensores["Umidade do Ar"]?.valorMed || 0));
      setPrecipitacaoTotal(Number(sensores["Precipitação"]?.valorAbsoluto || 0));
      setCurrentEvapo(Number(sensores["Evapotranspiração"]?.valorAbsoluto || 0));
      setCurrentFosforo(Number(sensores["Fósforo do Solo"]?.valorAbsoluto || 0));
      setCurrentNitrogenio(Number(sensores["Nitrogênio do Solo"]?.valorAbsoluto || 0));
      setCurrentPotassio(Number(sensores["Potássio do Solo"]?.valorAbsoluto || 0));

      // Converter o timestamp para um formato legível
      if (dadosAtuais.timestampColeta) {
        const data = new Date(dadosAtuais.timestampColeta);
        const hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        setUltimaAtualizacao(hora);
      }

      setCarregando(false);
    }
  }, [dadosAtuais]);


  return (
    <>
    {carregando ? (
      <Skeleton/>
    ) : (
      <ScrollView>
      <View style={styles.tituloPrincipal}>
        <View>
          <Text style={styles.titulo}> {dataAtual} - {ultimaAtualizacao} </Text>
        </View>
      </View>
      <View style={styles.cards}>
        <View style={styles.tituloSecundario}>
          <View style={{width:'90%'}}>
            <Text style={styles.textTitulo}> DADOS GERAIS </Text>
          </View>
          <View style={{width:'10%'}}>
            <TouchableOpacity onPress={() => setVisibleDadosGerais((prevState) => (!prevState))}>
              <Text style={styles.textTitulo}> {visibleDadosGerais ? <Octicons name='chevron-down' size={26}/> : <Octicons name='chevron-up' size={26}/>} </Text>
            </TouchableOpacity>
          </View>
        </View>
        {visibleDadosGerais ? (
          <>
            <Card 
              icone={{nomeIcon: 'thermometer', directory:'MaterialCommunityIcons'}}
              label={'TEMPERATURA ATUAL'} 
              informacao={String(currentTemp).concat(' °C')}
              modal={{
                title: 'Temperatura Atual (°C)',
                text: 'A temperatura atual refere-se à leitura da temperatura do ar em um momento específico, no caso medida em graus Celsius (°C). Esta medida é crucial para diversos aspectos da vida cotidiana, incluindo agricultura, saúde, planejamento urbano e atividades ao ar livre. No contexto agrícola, a temperatura atual é um indicador vital que influencia diretamente o crescimento e desenvolvimento das plantas.'
              }}
            />
            <Card 
              icone={{nomeIcon: 'weather-pouring', directory:'MaterialCommunityIcons'}}
              label={'PRECIPITAÇÃO DO DIA'} 
              informacao={String(precipitacaoTotal).concat(' mm')}
              modal={{
                title: 'Precipitação do Dia (mm)',
                text: 'A precipitação refere-se à quantidade de chuva ou neve que caiu em um período específico. É medida em milímetros (mm). Na agricultura, a precipitação é vital para a irrigação natural das plantas. Quantidades adequadas de precipitação são essenciais para o crescimento saudável das plantas, mas o excesso pode causar encharcamento e doenças.'
              }}
            />
            <Card 
              icone={{nomeIcon: 'thermometer-chevron-up', directory:'MaterialCommunityIcons'}}
              label={'TEMPERATURA MÁXIMA'} 
              informacao={String(tempMax).concat(' °C')}
              modal={{
                title: 'Temperatura Máxima (°C)',
                text: 'A temperatura máxima é a leitura mais alta da temperatura do ar durante o dia. Este dado é importante para a agricultura, pois temperaturas muito altas podem causar estresse térmico nas plantas, afetando negativamente seu crescimento e produtividade. Monitorar a temperatura máxima ajuda a adotar medidas de proteção, como sombreamento e irrigação.'
              }}
            />
            <Card 
              icone={{nomeIcon: 'thermometer-chevron-down', directory:'MaterialCommunityIcons'}}
              label={'TEMPERATURA MÍNIMA'} 
              informacao={String(tempMin).concat(' °C')}
              modal={{
                title: 'Temperatura Mínima (°C)',
                text: 'A temperatura mínima é a leitura mais baixa da temperatura do ar durante o dia. Este dado é crucial para identificar períodos de frio que podem danificar culturas sensíveis ou retardar o crescimento. Monitorar a temperatura mínima ajuda a planejar ações como coberturas e aquecimento para proteger as plantas.'
              }}
            />
            <Card 
              icone={{nomeIcon: 'pine-tree-fire', directory:'MaterialCommunityIcons'}}
              label={'EVAPOTRANSPIRAÇÃO'} 
              informacao={String(currentEvapo).concat(' mm')}
              modal={{
                title: 'Evapotranspiração (mm)',
                text: 'A evapotranspiração (ET) é a soma da evaporação da água do solo e a transpiração das plantas. É medida em milímetros (mm). Este processo é essencial para o ciclo da água na agricultura. Altas taxas de ET indicam maior necessidade de irrigação, enquanto baixas taxas podem significar menor demanda hídrica das plantas.'
              }}
            />
            <Card 
              icone={{nomeIcon: 'air', directory:'MaterialIcons'}}
              label={'UMIDADE DO AR'} 
              informacao={String(currentUmidadeAr).concat(' %')}
              modal={{
                title: 'Umidade do Ar (%)',
                text: 'A umidade do ar é a quantidade de vapor de água presente no ar, expressa em porcentagem (%). Na agricultura, a umidade do ar afeta a transpiração das plantas e a evaporação do solo. Níveis ótimos de umidade ajudam a manter o equilíbrio hídrico das plantas, enquanto níveis extremos podem causar estresse hídrico ou favorecer doenças.'
              }}
            /> 
          </>
        ) : null}
        <View style={styles.tituloSecundario}>
          <View style={{width:'90%'}}>
            <Text style={styles.textTitulo}> DADOS DO SOLO </Text>
          </View>
          <View style={{width:'10%'}}>
            <TouchableOpacity onPress={() => setVisibleDadosDoSolo((prevState) => (!prevState))}>
              <Text style={styles.textTitulo}> {visibleDadosDoSolo ? <Octicons name='chevron-down' size={26}/> : <Octicons name='chevron-up' size={26}/>} </Text>
            </TouchableOpacity>
          </View>
        </View>

        {visibleDadosDoSolo &&
        <>
            <Card 
            icone={{
              nomeIcon: 'elevation-decline',
              directory: 'MaterialCommunityIcons',
              color: currentTempSolo > 20 && currentTempSolo < 30 ? CORES.verdeClaro : 'red'
            }}
            label={'TEMPERATURA DO SOLO'} 
            informacao={String(currentTempSolo).concat(' °C')}
            modal={{
              title: 'Temperatura do Solo (°C)',
              text: 'A temperatura do solo é a medida de calor no solo, influenciada pela temperatura do ar, radiação solar e umidade. É crucial para processos como germinação de sementes e atividade microbiana. Temperaturas extremas podem afetar negativamente o crescimento das plantas e a disponibilidade de nutrientes. A faixa considerada ideal é entre 20°C e 30°C. Valores fora dessa faixa não são recomendados.'
              }}
              />
          <Card 
            icone={{
              nomeIcon: 'chemical-weapon', 
              directory: 'MaterialCommunityIcons',
              color: currentNitrogenio > 15 && currentNitrogenio < 40 ? CORES.verdeClaro : 'red'
            }}
            label={'NITROGÊNIO'} 
            informacao={String(currentNitrogenio).concat(' mg/kg')}
            modal={{
              title: 'Nitrogênio (mg/kg)',
              text: 'O nitrogênio é um nutriente essencial para o crescimento das plantas, vital para a formação de proteínas e clorofila. Níveis adequados de nitrogênio promovem um crescimento vigoroso e produtivo, enquanto deficiências podem causar folhas amareladas e baixo rendimento. A faixa considerada ideal é entre 15 mg/kg e 40 mg/kg. Valores fora dessa faixa não são recomendados.'
            }}
            /> 
          <Card 
            icone={{ 
              nomeIcon: 'water', 
              directory: 'MaterialCommunityIcons', 
              color: currentUmidadeSolo > 90 || currentUmidadeSolo < 50 ? 'red' : CORES.verdeClaro 
            }}
            label={'UMIDADE DO SOLO'} 
            informacao={String(currentUmidadeSolo).concat(' %')}
            modal={{
              title: 'Umidade do Solo (%)',
              text: 'A umidade do solo é a quantidade de água presente no solo, vital para o crescimento das plantas. Ela influencia a absorção de nutrientes e o desenvolvimento das raízes. Níveis inadequados de umidade podem causar estresse hídrico, afetando negativamente o crescimento e a saúde das plantas. A faixa considerada ideal é entre 50% e 90%. Valores fora dessa faixa não são recomendados.'
            }}
            /> 
          <Card 
            icone={{
              nomeIcon: 'pill', 
              directory: 'MaterialCommunityIcons',
              color: currentPotassio > 100 && currentPotassio < 150 ? CORES.verdeClaro : 'red'
            }}
            label={'POTÁSSIO'} 
            informacao={String(currentPotassio).concat(' mg/kg')}
            modal={{
              title: 'Potássio (mg/kg)',
              text: 'O potássio é um nutriente essencial que ajuda na resistência das plantas a doenças, regulação da abertura dos estômatos e síntese de proteínas. Níveis adequados de potássio melhoram a qualidade dos frutos e a resistência ao estresse. Deficiências podem causar folhas amareladas e produtividade reduzida. A faixa considerada ideal é entre 100 mg/kg e 150 mg/kg. Valores fora dessa faixa não são recomendados.'
            }}
            />
          <Card 
            icone={{
              nomeIcon: 'flask-outline', 
              directory: 'MaterialCommunityIcons',
              color: currentFosforo > 15 && currentFosforo < 50 ? CORES.verdeClaro : 'red'
            }}
            label={'FÓSFORO'} 
            informacao={String(currentFosforo).concat(' mg/kg')}
            modal={{
              title: 'Fósforo (mg/kg)',
              text: 'O fósforo é crucial para o desenvolvimento das raízes e a floração das plantas. Ele ajuda na transferência de energia e na formação de sementes e frutos. Níveis adequados de fósforo promovem um crescimento saudável e uma colheita abundante, enquanto deficiências podem resultar em crescimento atrofiado e baixo rendimento. A faixa considerada ideal é entre 15 mg/kg e 50 mg/kg. Valores fora dessa faixa não são recomendados.'
            }}
            />     
        
            </>
        }
      </View>

      <View style={styles.tituloSecundario}>
        <View style={{width:'90%'}}>
          <Text style={styles.textTitulo}> GRÁFICOS </Text>
        </View>
        <View style={{width:'10%'}}>
          <TouchableOpacity onPress={() => setVisibleDadosGraficos((prevState) => (!prevState))}>
            <Text style={styles.textTitulo}> {visibleDadosGraficos ? <Octicons name='chevron-down' size={26}/> : <Octicons name='chevron-up' size={26}/>} </Text>
          </TouchableOpacity>
        </View>
      </View>

      {visibleDadosGraficos ? (
        <>
        <View>
          <LineChartExemple/>
        </View>
          <View>
          <BarChartExample
            qtdFosforo={currentFosforo}
            qtdNitrogenio={currentNitrogenio}
            qtdPotassio={currentPotassio}
            // qtdTempDoSolo={currentTempSolo}
            />
          </View>
          </>
      ) : (
        <></>
        )}

    </ScrollView>
    )}
  </>
    
  );
}

export default StatusCultura;
