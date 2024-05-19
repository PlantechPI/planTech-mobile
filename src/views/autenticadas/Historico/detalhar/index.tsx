import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import AuthContext from '../../../../context/auth';


const HistoricoDetalhado: React.FC<{}> = ({}) => {
    const { listarInformacoesDiarias } = useContext(AuthContext)
    const route = useRoute();
    const navigation = useNavigation();

    const [logs, setLogs] = useState<[]>();
    const [loading, setLoading] = useState(true);

    const [mediaFosforo, setMediaFosforo] = useState<number>(0)
    const [mediaNitrogenio, setMediaNitrogenio] = useState<number>(0)
    const [mediaPotassio, setMediaPotassio] = useState<number>(0)
    const [mediaTempSolo, setMediaTempSolo] = useState<number>(0) 
    const [mediaUmidadeAr, setMediaUmidadeAr] = useState<number>(0)
    const [mediaUmidadeSolo, setMediaUmidadeSolo] = useState<number>(0)
    const [precipitacaoTotal, setPrecipitacaoTotal] = useState<number>(0)
    const [tempMax, setTempMax] = useState<number>(0)
    const [tempMin, setTempMin] = useState<number>(0)


    const data = route.params?.data;

    const recuperarInfos = async() =>{
        const res = await listarInformacoesDiarias(data)
        setLogs(res)
        setLoading(false); // Defina loading como falso após a obtenção dos dados
    }

    useEffect(() =>{
        recuperarInfos()
    }, [])

    useEffect(() =>{
        if(logs !== undefined){
            let totalFosforo = 0
            let totalNitrogenio = 0
            let totalPotassio = 0
            let totalTempSolo = 0
            let totalUmidadeAr = 0
            let totalUmidadeSolo = 0
            let totalPrecipitacaoTotal = 0
            let temperaturaMax = 0
            let temperaturaMin = 300
            logs.map((item, index)=>{
                totalFosforo += item.fosforoSolo
                totalNitrogenio += item.nitrogenioSolo
                totalPotassio += item.potassioSolo
                totalTempSolo += item.tempSolo
                totalPrecipitacaoTotal += item.precipitacao
                totalUmidadeAr += item.umidadeAr
                totalUmidadeSolo += item.umidadeSolo
                if(item.tempMax > temperaturaMax){
                    temperaturaMax = item.tempMax
                }
                if(item.tempMin < temperaturaMin){
                    temperaturaMin = item.tempMin
                }
            })
            // console.log('Tamanho logs', logs.length)
            // console.log('totalFosforo', (totalFosforo/logs.length).toFixed(2))
            // console.log('totalNitrogenio', (totalNitrogenio/logs.length).toFixed(2))
            // console.log('totalPotassio', (totalPotassio/logs.length).toFixed(2))
            // console.log('totalTempSolo', (totalFosforo/logs.length/2).toFixed(2))
            // console.log('temperaturaMax', (temperaturaMax).toFixed(2))
            // console.log('temperaturaMin', (temperaturaMin).toFixed(2))

            setMediaFosforo(Number((totalFosforo/logs.length).toFixed(2)))
            setMediaNitrogenio(Number((totalNitrogenio/logs.length).toFixed(2)))
            setMediaPotassio(Number((totalPotassio/logs.length).toFixed(2)))
            // setMediaTempSolo(Number((totalFosforo/logs.length/2).toFixed(2)))
            setMediaUmidadeAr(Number((totalUmidadeAr/logs.length).toFixed(2)))
            setMediaUmidadeSolo(Number((totalUmidadeSolo/logs.length).toFixed(2)))
            setPrecipitacaoTotal(Number(totalPrecipitacaoTotal.toFixed(2)))
            setTempMax(Number(temperaturaMax.toFixed(2)))
            setTempMin(Number(temperaturaMin.toFixed(2)))
            
        }
    }, [logs])

    return (
        <ScrollView style={styles.container}>
            
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="green" />
                </View>
                
            ) : (
                <View style={styles.centro}>


             <View style={styles.cardPrinpipal}>
                <View style={{height: '100%'}}>
                    <View style={styles.lateralColorida}/>
                </View>

                <View>
                    <Text> Media fósforo: {mediaFosforo}</Text>
                    <Text> Media Nitrogenio: {mediaNitrogenio}</Text>
                    <Text> Media Potassio: {mediaPotassio}</Text>
                    <Text> Media umidade do ar: {mediaUmidadeAr}</Text>
                    <Text> Media umidade do solo: {mediaUmidadeSolo}</Text>
                    <Text> Precipitação do dia: {precipitacaoTotal}</Text>
                    <Text> Temperatura maxima: {tempMax}</Text>
                    <Text> Temperatura minima: {tempMin}</Text>
                    </View>
                </View>



                    {logs && logs.map((item, index) => (
                        <View key={index} style={styles.logs}>
                            <Text style={{fontWeight: 'bold'}}> {item.horaDado}</Text>

                            <Text>Temperatura do solo: {item.tempSolo} </Text>
                            <Text>Fosforo no Solo: {item.fosforoSolo}</Text>
                            <Text>Nitrogenio do solo: {item.nitrogenioSolo}</Text>
                            <Text>Potassio do solo: {item.potassioSolo}</Text>
                            <Text>Umidade do ar: {item.umidadeAr}</Text>
                            <Text>Umidade do solo: {item.umidadeSolo}</Text>
                            <Text>Temperatura: {item.tempMax}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};


export default HistoricoDetalhado;
