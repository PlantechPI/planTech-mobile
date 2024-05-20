import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import AuthContext from '../../../../context/auth';
import { MaterialIcons } from '@expo/vector-icons';
import NotFound from '../../../../components/NotFound'


const HistoricoDetalhado: React.FC<{}> = ({}) => {
    const { listarInformacoesDiarias, evapoDoDia } = useContext(AuthContext)
    const route = useRoute();
    const navigation = useNavigation();

    const [logs, setLogs] = useState<[]>();
    const [loading, setLoading] = useState(true);
    const [existeDado, setExisteDado] = useState(true)

    const [mediaFosforo, setMediaFosforo] = useState<number>(0)
    const [mediaNitrogenio, setMediaNitrogenio] = useState<number>(0)
    const [mediaPotassio, setMediaPotassio] = useState<number>(0)
    const [mediaTempSolo, setMediaTempSolo] = useState<number>(0) 
    const [mediaUmidadeAr, setMediaUmidadeAr] = useState<number>(0)
    const [mediaUmidadeSolo, setMediaUmidadeSolo] = useState<number>(0)
    const [precipitacaoTotal, setPrecipitacaoTotal] = useState<number>(0)
    const [tempMax, setTempMax] = useState<number>(0)
    const [tempMin, setTempMin] = useState<number>(0)
    const [evapo, setEvapo] = useState<number>(0)


    const data = route.params?.data;

    const recuperarInfos = async() =>{
        const res = await listarInformacoesDiarias(data)
        const evapoDodia = await evapoDoDia(data)
        setEvapo(evapoDodia.ETO)
        console.log('evapo', evapo.ETO)
        if(res.length !== 0){
            setLogs(res)
            setLoading(false); 
        }else{
            setExisteDado(false)
            console.log('Exibir a página not found')
        }
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

            setMediaFosforo(Number((totalFosforo/logs.length).toFixed(2)))
            setMediaNitrogenio(Number((totalNitrogenio/logs.length).toFixed(2)))
            setMediaPotassio(Number((totalPotassio/logs.length).toFixed(2)))
            setMediaTempSolo(Number((totalFosforo/logs.length/2).toFixed(2)))
            setMediaUmidadeAr(Number((totalUmidadeAr/logs.length).toFixed(2)))
            setMediaUmidadeSolo(Number((totalUmidadeSolo/logs.length).toFixed(2)))
            setPrecipitacaoTotal(Number(totalPrecipitacaoTotal.toFixed(2)))
            setTempMax(Number(temperaturaMax.toFixed(2)))
            setTempMin(Number(temperaturaMin.toFixed(2)))
            
        }
    }, [logs])

    const extrairHorasMinutos = (horario:string) => {
        const [horas, minutos] = horario.split(':');
        return `${horas}:${minutos}`;
      }

    return (
        <>
        {existeDado ? (
            <ScrollView style={styles.container}>
            
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={40} color="green" />
                </View>
                
            ) : (
                <View style={styles.centro}>


             <View style={styles.cardPrinpipal}>
                <View style={{height: '100%'}}>
                    <View style={styles.lateralColorida}/>
                </View>

                <View>
                <View style={styles.tituloMedia}>
                                <MaterialIcons name="percent" size={20} color='#000' />
                                <Text style={styles.titulo}> MÉDIAS DIÁRIAS</Text>
                            </View>

                    <Text> Evapotranspiração do dia: {evapo}</Text>
                    <Text> Media fósforo: {mediaFosforo}</Text>
                    <Text> Media Nitrogenio: {mediaNitrogenio}</Text>
                    <Text> Media Potassio: {mediaPotassio}</Text>
                    <Text> Media umidade do ar: {mediaUmidadeAr}</Text>
                    <Text> Media umidade do solo: {mediaUmidadeSolo}</Text>
                    <Text> Media temperatura do solo: {mediaTempSolo}</Text>
                    <Text> Precipitação do dia: {precipitacaoTotal}</Text>
                    <Text> Temperatura maxima: {tempMax}</Text>
                    <Text> Temperatura minima: {tempMin}</Text>
                    </View>
                </View>



                    {logs && logs.map((item, index) => (
                        <View key={index} style={styles.logs}>
                            <Text style={{fontWeight: 'bold'}}> {extrairHorasMinutos(item.horaDado)}</Text>

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
        ) : (
            <NotFound />
        )}
        
        
        </>
    );
};



export default HistoricoDetalhado;
