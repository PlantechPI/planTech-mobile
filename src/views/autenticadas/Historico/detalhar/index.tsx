import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import AuthContext from '../../../../context/auth';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import NotFound from '../../../../components/NotFound';
import { Skeleton } from '../../StatusCultura/components/Skeleton';
import Card from './components/Card';
import { CORES } from '../../../../enum/Cores';
import  CardTelaToda from './components/CardTelaToda'
import GraficoDeLinha from './components/GraficoLinha'

const HistoricoDetalhado: React.FC = () => {
    const { listarInformacoesDiarias } = useContext(AuthContext);
    const route = useRoute();
    const navigation = useNavigation();

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [existeDado, setExisteDado] = useState(true);

    const [tempMaxData, setTempMaxData] = useState<number[]>([]);
    const [tempMinData, setTempMinData] = useState<number[]>([]);

    const [mediaFosforo, setMediaFosforo] = useState<number>(0);
    const [mediaNitrogenio, setMediaNitrogenio] = useState<number>(0);
    const [mediaPotassio, setMediaPotassio] = useState<number>(0);
    const [mediaTempSolo, setMediaTempSolo] = useState<number>(0);
    const [mediaUmidadeAr, setMediaUmidadeAr] = useState<number>(0);
    const [mediaUmidadeSolo, setMediaUmidadeSolo] = useState<number>(0);
    const [precipitacaoTotal, setPrecipitacaoTotal] = useState<number>(0);
    const [mediaTemp, setMediaTemp] = useState(0);
    const [tempMax, setTempMax] = useState<number>(0);
    const [tempMin, setTempMin] = useState<number>(0);
    const [evapo, setEvapo] = useState<number>(0);
    const [visibleDadosGerais, setVisibleDadosGerais] = useState(true);
    const [visibleLogs, setVisibleLogs] = useState(true);
    const [visibilidadeGraficos, setVisibleDadosGraficos] = useState(true);

    const data = route.params?.data;

    const recuperarInfos = async () => {
        const res = await listarInformacoesDiarias(data);
        if (res.length !== 0) {
            setLogs(res);
            setLoading(false);
        } else {
            setExisteDado(false);
        }
    };

    useEffect(() => {
        recuperarInfos();
    }, []);

    useEffect(() => {
        if (logs.length > 0) {
            let totalFosforo = 0;
            let totalNitrogenio = 0;
            let totalPotassio = 0;
            let totalTempSolo = 0;
            let totalUmidadeAr = 0;
            let totalUmidadeSolo = 0;
            let totalPrecipitacaoTotal = 0;
            let temperaturaMax = 0;
            let temperaturaMin = 300;
            let totalTempMedia = 0;

            logs.forEach((item: any) => {
                totalFosforo += item.fosforoSolo;
                totalNitrogenio += item.nitrogenioSolo;
                totalPotassio += item.potassioSolo;
                totalTempSolo += item.tempSolo;
                totalPrecipitacaoTotal += item.precipitacao;
                totalUmidadeAr += item.umidadeAr;
                totalUmidadeSolo += item.umidadeSolo;
                totalTempMedia += item.tempMax;
                if (item.tempMax > temperaturaMax) {
                    temperaturaMax = item.tempMax;
                }
                if (item.tempMin < temperaturaMin) {
                    temperaturaMin = item.tempMin;
                }
            });

            setMediaFosforo(Number((totalFosforo / logs.length).toFixed(2)));
            setMediaNitrogenio(Number((totalNitrogenio / logs.length).toFixed(2)));
            setMediaPotassio(Number((totalPotassio / logs.length).toFixed(2)));
            setMediaTempSolo(Number((totalTempSolo / logs.length).toFixed(2)));
            setMediaUmidadeAr(Number((totalUmidadeAr / logs.length).toFixed(2)));
            setMediaUmidadeSolo(Number((totalUmidadeSolo / logs.length).toFixed(2)));
            setMediaTemp(Number((totalTempMedia / logs.length).toFixed(2)));
            setPrecipitacaoTotal(Number(totalPrecipitacaoTotal.toFixed(2)));
            setTempMax(Number(temperaturaMax.toFixed(2)));
            setTempMin(Number(temperaturaMin.toFixed(2)));
        }
    }, [logs]);

    const extrairHorasMinutos = (horario: string) => {
        const [horas, minutos] = horario.split(':');
        return `${horas}:${minutos}`;
    };

    const getIconName = (horaDado: string) => {
        const hour = parseInt(horaDado.split(':')[0], 10);
        if (hour > 18) {
            return 'day-haze';
        } else if (hour > 12) {
            return 'day-sunny';
        } else {
            return 'horizon';
        }
    };

    useEffect(() => {
        if (logs.length > 0) {
            let tempMaxArray: number[] = [];
            let tempMinArray: number[] = [];
            let tempMaxFiltered: number[] = [];
            let tempMinFiltered: number[] = [];
            let labelsFiltered: string[] = [];

            // Filtra os dados a cada 2 horas
            logs.forEach((item: any) => {
                tempMaxFiltered.push(item.tempMax);
                tempMinFiltered.push(item.tempMin);
                labelsFiltered.push(item.horaDado);
            });

            setTempMaxData(tempMaxFiltered);
            setTempMinData(tempMinFiltered);

            // Ajuste a estrutura do objeto data
            const data = {
                labels: labelsFiltered,
                datasets: [
                    {
                        data: tempMaxFiltered,
                        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // cor da linha de temperatura máxima
                        strokeWidth: 2,
                    },
                ],
            };

            // Atualiza o estado dos dados
            // setData(data);
        }
    }, [logs]);

    return (
        existeDado ? (
            <ScrollView style={styles.container}>
                {loading ? (
                    // <View style={styles.loadingContainer}>
                        <Skeleton />
                    // </View>
                ) : (
                    <View style={styles.cards}>
                        <View style={styles.tituloSecundario}>
                            <View style={{ width: '90%' }}>
                                <Text style={styles.textTitulo}> MÉDIAS DO DIA {data}</Text>
                            </View>
                            <View style={{ width: '10%' }}>
                                <TouchableOpacity onPress={() => setVisibleDadosGerais((prevState) => (!prevState))}>
                                    <Text style={styles.textTitulo}>
                                        {visibleDadosGerais ? <Octicons name='chevron-down' size={26} /> : <Octicons name='chevron-up' size={26} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {visibleDadosGerais && (
                            <>
                                <Card
                                    icone={{ nomeIcon: 'thermometer', directory: 'MaterialCommunityIcons' }}
                                    label={'TEMPERATURA MÉDIA'}
                                    informacao={String(mediaTemp).concat( '°C')} // Assumi que currentTemp deveria ser mediaTempSolo
                                    modal={{
                                        title: 'Temperatura Atual (°C)',
                                        text: 'A temperatura atual refere-se à leitura da temperatura do ar em um momento específico, no caso medida em graus Celsius (°C). Esta medida é crucial para diversos aspectos da vida cotidiana, incluindo agricultura, saúde, planejamento urbano e atividades ao ar livre. No contexto agrícola, a temperatura atual é um indicador vital que influencia diretamente o crescimento e desenvolvimento das plantas.'
                                    }}
                                />
                                <Card
                                    icone={{ nomeIcon: 'weather-pouring', directory: 'MaterialCommunityIcons' }}
                                    label={'PRECIPITAÇÃO DO DIA'}
                                    informacao={String(precipitacaoTotal).concat( 'mm')}
                                    modal={{
                                        title: 'Precipitação do Dia (mm)',
                                        text: 'A precipitação refere-se à quantidade de chuva ou neve que caiu em um período específico. É medida em milímetros (mm). Na agricultura, a precipitação é vital para a irrigação natural das plantas. Quantidades adequadas de precipitação são essenciais para o crescimento saudável das plantas, mas o excesso pode causar encharcamento e doenças.'
                                    }}
                                />
                                <Card
                                    icone={{ nomeIcon: 'thermometer-chevron-up', directory: 'MaterialCommunityIcons' }}
                                    label={'TEMPERATURA MÁXIMA'}
                                    informacao={String(tempMax).concat( '°C')}
                                    modal={{
                                        title: 'Temperatura Máxima (°C)',
                                        text: 'A temperatura máxima é a leitura mais alta da temperatura do ar durante o dia. Este dado é importante para a agricultura, pois temperaturas muito altas podem causar estresse térmico nas plantas, afetando negativamente seu crescimento e produtividade. Monitorar a temperatura máxima ajuda a adotar medidas de proteção, como sombreamento e irrigação.'
                                    }}
                                />
                                <Card
                                    icone={{ nomeIcon: 'thermometer-chevron-down', directory: 'MaterialCommunityIcons' }}
                                    label={'TEMPERATURA MÍNIMA'}
                                    informacao={String(tempMin).concat( '°C')}
                                    modal={{
                                        title: 'Temperatura Mínima (°C)',
                                        text: 'A temperatura mínima é a leitura mais baixa da temperatura do ar durante o dia. Este dado é crucial para identificar períodos de frio que podem danificar culturas sensíveis ou retardar o crescimento. Monitorar a temperatura mínima ajuda a planejar ações como coberturas e aquecimento para proteger as plantas.'
                                    }}
                                />
                                <Card
                                    icone={{ nomeIcon: 'pine-tree-fire', directory: 'MaterialCommunityIcons' }}
                                    label={'EVAPOTRANSPIRAÇÃO'}
                                    informacao={String(evapo).concat( 'mm')}
                                    modal={{
                                        title: 'Evapotranspiração (mm)',
                                        text: 'A evapotranspiração (ET) é a soma da evaporação da água do solo e a transpiração das plantas. É medida em milímetros (mm). Este processo é essencial para o ciclo da água na agricultura. Altas taxas de ET indicam maior necessidade de irrigação, enquanto baixas taxas podem significar menor demanda hídrica das plantas.'
                                    }}
                                />
                                <Card
                                    icone={{ nomeIcon: 'air', directory: 'MaterialIcons' }}
                                    label={'UMIDADE DO AR'}
                                    informacao={String(mediaUmidadeAr).concat( '%')}
                                    modal={{
                                        title: 'Umidade do Ar (%)',
                                        text: 'A umidade do ar é a quantidade de vapor de água presente no ar, expressa em porcentagem (%). Na agricultura, a umidade do ar afeta a transpiração das plantas e a evaporação do solo. Níveis ótimos de umidade ajudam a manter o equilíbrio hídrico das plantas, enquanto níveis extremos podem causar estresse hídrico ou favorecer doenças.'
                                    }}
                                />
                                <Card 
                                icone={{
                                    nomeIcon: 'elevation-decline',
                                    directory: 'MaterialCommunityIcons',
                                    color: mediaTempSolo > 20 && mediaTempSolo < 30 ? CORES.verdeClaro : 'red'
                                }}
                                label={'TEMPERATURA DO SOLO'} 
                                informacao={String(mediaTempSolo).concat( '°C')}
                                modal={{
                                    title: 'Temperatura do Solo (°C)',
                                    text: 'A temperatura do solo é a medida de calor no solo, influenciada pela temperatura do ar, radiação solar e umidade. É crucial para processos como germinação de sementes e atividade microbiana. Temperaturas extremas podem afetar negativamente o crescimento das plantas e a disponibilidade de nutrientes. A faixa considerada ideal é entre 20°C e 30°C. Valores fora dessa faixa não são recomendados.'
                                    }}
                                    />
                                <Card 
                                icone={{
                                    nomeIcon: 'chemical-weapon', 
                                    directory: 'MaterialCommunityIcons',
                                    color: mediaNitrogenio > 15 && mediaNitrogenio < 40 ? CORES.verdeClaro : 'red'
                                }}
                                label={'NITROGÊNIO'} 
                                informacao={String(mediaNitrogenio).concat( 'mg/kg')}
                                modal={{
                                    title: 'Nitrogênio (mg/kg)',
                                    text: 'O nitrogênio é um nutriente essencial para o crescimento das plantas, vital para a formação de proteínas e clorofila. Níveis adequados de nitrogênio promovem um crescimento vigoroso e produtivo, enquanto deficiências podem causar folhas amareladas e baixo rendimento. A faixa considerada ideal é entre 15 mg/kg e 40 mg/kg. Valores fora dessa faixa não são recomendados.'
                                }}
                                /> 
                                <Card 
                                icone={{ 
                                    nomeIcon: 'water', 
                                    directory: 'MaterialCommunityIcons', 
                                    color: mediaUmidadeSolo > 90 || mediaUmidadeSolo < 50 ? 'red' : CORES.verdeClaro 
                                }}
                                label={'UMIDADE DO SOLO'} 
                                informacao={String(mediaUmidadeSolo).concat( '%')}
                                modal={{
                                    title: 'Umidade do Solo (%)',
                                    text: 'A umidade do solo é a quantidade de água presente no solo, vital para o crescimento das plantas. Ela influencia a absorção de nutrientes e o desenvolvimento das raízes. Níveis inadequados de umidade podem causar estresse hídrico, afetando negativamente o crescimento e a saúde das plantas. A faixa considerada ideal é entre 50% e 90%. Valores fora dessa faixa não são recomendados.'
                                }}
                                /> 
                                <Card 
                                icone={{
                                    nomeIcon: 'pill', 
                                    directory: 'MaterialCommunityIcons',
                                    color: mediaPotassio > 100 && mediaPotassio < 150 ? CORES.verdeClaro : 'red'
                                }}
                                label={'POTÁSSIO'} 
                                informacao={String(mediaPotassio).concat( 'mg/kg')}
                                modal={{
                                    title: 'Potássio (mg/kg)',
                                    text: 'O potássio é um nutriente essencial que ajuda na resistência das plantas a doenças, regulação da abertura dos estômatos e síntese de proteínas. Níveis adequados de potássio melhoram a qualidade dos frutos e a resistência ao estresse. Deficiências podem causar folhas amareladas e produtividade reduzida. A faixa considerada ideal é entre 100 mg/kg e 150 mg/kg. Valores fora dessa faixa não são recomendados.'
                                }}
                                />
                                <Card 
                                icone={{
                                    nomeIcon: 'flask-outline', 
                                    directory: 'MaterialCommunityIcons',
                                    color: mediaFosforo > 15 && mediaFosforo < 50 ? CORES.verdeClaro : 'red'
                                }}
                                label={'FÓSFORO'} 
                                informacao={String(mediaFosforo).concat( 'mg/kg')}
                                modal={{
                                    title: 'Fósforo (mg/kg)',
                                    text: 'O fósforo é crucial para o desenvolvimento das raízes e a floração das plantas. Ele ajuda na transferência de energia e na formação de sementes e frutos. Níveis adequados de fósforo promovem um crescimento saudável e uma colheita abundante, enquanto deficiências podem resultar em crescimento atrofiado e baixo rendimento. A faixa considerada ideal é entre 15 mg/kg e 50 mg/kg. Valores fora dessa faixa não são recomendados.'
                                }}
                                />     

                            </>
                        )}
                        <View style={styles.tituloSecundario}>
                            <View style={{ width: '90%' }}>
                                <Text style={styles.textTitulo}> GRÁFICOS </Text>
                        </View>
                            <View style={{ width: '10%' }}>
                                <TouchableOpacity onPress={() => setVisibleDadosGraficos((prevState) => (!prevState))}>
                                    <Text style={styles.textTitulo}>
                                        {visibilidadeGraficos ? <Octicons name='chevron-down' size={26} /> : <Octicons name='chevron-up' size={26} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {visibilidadeGraficos && (
                            <View>
                                <GraficoDeLinha 
                                    data={{
                                        labels: logs.map((log: any) => (log.horaDado)),
                                        datasets: [
                                            {
                                                data: tempMaxData,
                                                color: () => 'blue',
                                                strokeWidth: 2,
                                            },
                                        ],
                                    }}
                                />
                            </View>
                        )}

                        <View style={styles.tituloSecundario}>
                            <View style={{ width: '90%' }}>
                                <Text style={styles.textTitulo}>MOMENTOS DE AFERIÇÃO </Text>
                            </View>
                            <View style={{ width: '10%' }}>
                                <TouchableOpacity onPress={() => setVisibleLogs((prevState) => (!prevState))}>
                                    <Text style={styles.textTitulo}>
                                        {visibleLogs ? <Octicons name='chevron-down' size={26} /> : <Octicons name='chevron-up' size={26} />}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>    
                        {visibleLogs && (
                            <View style={styles.centro}>
                            {logs.map((item:any, index) => (
                                <View key={index}>
                                <CardTelaToda 
                                    icone={{
                                        nomeIcon: getIconName(item.horaDado), 
                                        directory: 'Fontisto',
                                        color: CORES.verdeClaro
                                    }}
                                    label={'HORÁRIO'} 
                                    informacao={String(item?.horaDado)}
                                    data={{
                                        horaDado: item.horaDado,
                                        tempSolo: item.tempSolo,
                                        fosforoSolo: item.fosforoSolo,
                                        nitrogenioSolo: item.nitrogenioSolo,
                                        potassioSolo: item.potassioSolo,
                                        umidadeAr: item.umidadeAr,
                                        umidadeSolo: item.umidadeSolo,
                                        tempMax: item.tempMax,
                                    }}
                                />
                                </View>
                            ))}
                        </View>
                        )}


                    </View>
                )}
            </ScrollView>
        ) : (
            <NotFound />
        )
    );
};

export default HistoricoDetalhado;
