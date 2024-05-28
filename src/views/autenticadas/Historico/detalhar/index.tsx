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
        if(res.length !== 0){
            setLogs(res)
            setLoading(false); 
        }else{
            setExisteDado(false)
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
                                <MaterialIcons name="percent" size={26} color='#000' />
                                <Text style={styles.titulo}> MÉDIAS DIÁRIAS</Text>
                            </View>

                    <Text style={styles.texto}>Evapotranspiração do dia: <Text style={{fontWeight: 500}}>{evapo}</Text></Text>
                    <Text style={styles.texto}>Media fósforo: <Text style={{fontWeight: 500}}>{mediaFosforo}</Text></Text>
                    <Text style={styles.texto}>Media Nitrogenio: <Text style={{fontWeight: 500}}>{mediaNitrogenio}</Text></Text>
                    <Text style={styles.texto}>Media Potassio: <Text style={{fontWeight: 500}}>{mediaPotassio}</Text></Text>
                    <Text style={styles.texto}>Media umidade do ar: <Text style={{fontWeight: 500}}>{mediaUmidadeAr}</Text></Text>
                    <Text style={styles.texto}>Media umidade do solo: <Text style={{fontWeight: 500}}>{mediaUmidadeSolo}</Text></Text>
                    <Text style={styles.texto}>Media temperatura do solo: <Text style={{fontWeight: 500}}>{mediaTempSolo}</Text></Text>
                    <Text style={styles.texto}>Precipitação do dia: <Text style={{fontWeight: 500}}>{precipitacaoTotal}</Text></Text>
                    <Text style={styles.texto}>Temperatura maxima: <Text style={{fontWeight: 500}}>{tempMax}</Text></Text>
                    <Text style={styles.texto}>Temperatura minima: <Text style={{fontWeight: 500}}>{tempMin}</Text></Text>
                    </View>
                </View>



                    {logs && logs.map((item, index) => (
                        <View key={index} style={styles.logs}>
                            <Text style={{fontWeight: 'bold', fontSize: 26}}> {extrairHorasMinutos(item.horaDado)}</Text>

                            <Text style={styles.texto}>Temperatura do solo: <Text style={{fontWeight: 500}}>{item.tempSolo}</Text> </Text>
                            <Text style={styles.texto}>Fosforo no Solo: <Text style={{fontWeight: 500}}>{item.fosforoSolo}</Text></Text>
                            <Text style={styles.texto}>Nitrogenio do solo: <Text style={{fontWeight: 500}}>{item.nitrogenioSolo}</Text></Text>
                            <Text style={styles.texto}>Potassio do solo: <Text style={{fontWeight: 500}}>{item.potassioSolo}</Text></Text>
                            <Text style={styles.texto}>Umidade do ar: <Text style={{fontWeight: 500}}>{item.umidadeAr}</Text></Text>
                            <Text style={styles.texto}>Umidade do solo: <Text style={{fontWeight: 500}}>{item.umidadeSolo}</Text></Text>
                            <Text style={styles.texto}>Temperatura: <Text style={{fontWeight: 500}}>{item.tempMax}</Text></Text>
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
