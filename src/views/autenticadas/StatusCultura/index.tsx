import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Touchable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import AuthContext from '../../../context/auth';
import { Octicons } from '@expo/vector-icons';
import Card from './components/Card'


const StatusCultura = () => {
  const { listarInformacoesDiarias, evapoDoDia } = useContext(AuthContext)
  const [ dataAtual, setDataAtual] = useState<string>('')
  const [ dadosAtuais, setDadosAtuais] = useState<any[]>([])
  
  const [ currentEvapo, setCurrentEvapo] = useState<number>(0)
  const [ currentFosforo, setCurrentFosforo] = useState<number>(0)
  const [ currentNitrogenio, setCurrentNitrogenio] = useState<number>(0)
  const [ currentPotassio, setCurrentPotassio] = useState<number>(0)
  const [ currentTempSolo, setCurrentTempSolo] = useState<number>(0) 
  const [ currentUmidadeAr, setCurrentUmidadeAr] = useState<number>(0)
  const [ currentUmidadeSolo, setCurrentUmidadeSolo] = useState<number>(0)
  const [ currentTemp, setCurrentTemp] = useState<number>(0)
  const [ precipitacaoTotal, setPrecipitacaoTotal] = useState<number>(0)
  const [ tempMax, setTempMax] = useState<number>(0)
  const [ tempMin, setTempMin] = useState<number>(0)
  const [ ultimaAtualizacao, setUltimaAtualizacao] = useState<string>("")

  const [ visibleDadosGerais, setVisibleDadosGerais] = useState(true)
  const [ visibleDadosDoSolo, setVisibleDadosDoSolo] = useState(true)
  
  
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return (`${day}/${month}/${year}`);
  };

  const recuperarDados = async() =>{
    const currentData = getCurrentDate();
    setDataAtual(currentData)
    const res = await listarInformacoesDiarias(currentData)
    const evapoDodia = await evapoDoDia(currentData)
    setCurrentEvapo(evapoDodia.ETO)
    setDadosAtuais(res)
  }

  useEffect(() =>{
    recuperarDados();
  }, [])

  useEffect(() =>{
    if(dadosAtuais.length > 0){
        let totalPrecipitacaoTotal = 0
        let temperaturaMax = 0
        let temperaturaMin = 300
        dadosAtuais.map((item)=>{
            totalPrecipitacaoTotal += item.precipitacao
            if(item.tempMax > temperaturaMax){
                temperaturaMax = item.tempMax
            }
            if(item.tempMin < temperaturaMin){
                temperaturaMin = item.tempMin
            }
        })
        const dadosMaisRecentes = dadosAtuais[(dadosAtuais.length-1)]
        console.log(dadosMaisRecentes)

        setCurrentFosforo(Number((dadosMaisRecentes.fosforoSolo).toFixed(2)))
        setCurrentNitrogenio(Number((dadosMaisRecentes.nitrogenioSolo).toFixed(2)))
        setCurrentPotassio(Number((dadosMaisRecentes.potassioSolo).toFixed(2)))
        setCurrentTempSolo(Number((dadosMaisRecentes.tempSolo).toFixed(2)))
        setCurrentUmidadeAr(Number((dadosMaisRecentes.umidadeAr).toFixed(2)))
        setCurrentUmidadeSolo(Number((dadosMaisRecentes.umidadeSolo).toFixed(2)))
        setCurrentTemp(Number(((dadosMaisRecentes.tempMax + dadosMaisRecentes.tempMin)/2).toFixed(2)))
        setPrecipitacaoTotal(totalPrecipitacaoTotal)
        setTempMax(temperaturaMax)
        setTempMin(temperaturaMin)
        setUltimaAtualizacao(dadosMaisRecentes.horaDado)
    }
}, [dadosAtuais])


    return (
          <ScrollView style={styles.container}>
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
                informacao={String(currentTemp)}
                /> 
                <Card 
                icone={{nomeIcon: 'weather-pouring', directory:'MaterialCommunityIcons'}}
                label={'PRECIPITAÇÃO DO DIA'} 
                informacao={String(precipitacaoTotal)}
                />
                <Card 
                icone={{nomeIcon: 'thermometer-chevron-up', directory:'MaterialCommunityIcons'}}
                label={'TEMPERATURA MAXIMA'} 
                informacao={String(tempMax)}
                />
                <Card 
                icone={{nomeIcon: 'thermometer-chevron-down', directory:'MaterialCommunityIcons'}}
                label={'TEMPERATURA MINIMA'} 
                informacao={String(tempMin)}
                />
  
                <Card 
                icone={{nomeIcon: 'pine-tree-fire', directory:'MaterialCommunityIcons'}}
                label={'EVAPOTRANSPIRAÇÃO'} 
                informacao={String(currentEvapo)}
                />
                <Card 
                icone={{nomeIcon: 'air', directory:'MaterialIcons'}}
                label={'UMIDADE DO AR'} 
                informacao={String(currentUmidadeAr)}
                /> 
                </>
              ) : (null)}

          <View style={styles.tituloSecundario}>
                <View style={{width:'90%'}}>
                  <Text style={styles.textTitulo}> DADOS GERAIS </Text>
                </View>
                <View style={{width:'10%'}}>
                  <TouchableOpacity onPress={() => setVisibleDadosDoSolo((prevState) => (!prevState))}>
                    <Text style={styles.textTitulo}> {visibleDadosDoSolo ? <Octicons name='chevron-down' size={26}/> : <Octicons name='chevron-up' size={26}/>} </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {visibleDadosDoSolo ? (
                <>
                <Card 
              icone={{nomeIcon: 'elevation-decline', directory:'MaterialCommunityIcons'}}
              label={'TEMPERATURA DO SOLO'} 
              informacao={String(currentTempSolo)}
              />

              <Card 
              icone={{nomeIcon: 'chemical-weapon', directory:'MaterialCommunityIcons'}}
              label={'NITROGENIO'} 
              informacao={String(currentNitrogenio)}
              /> 
              <Card 
              icone={{nomeIcon: 'water', directory:'MaterialCommunityIcons'}}
              label={'UMIDADE DO SOLO'} 
              informacao={String(currentUmidadeSolo)}
              /> 

              <Card 
              icone={{nomeIcon: 'pill', directory:'MaterialCommunityIcons'}}
              label={'POTÁSSIO'} 
              informacao={String(currentPotassio)}
              />
              <Card 
              icone={{nomeIcon: 'flask-outline', directory:'MaterialCommunityIcons', color:'red'}}
              label={'FÓSFORO'} 
              informacao={String(currentFosforo)}
              />         
                </>
              ) : null}

                 
            </View>
          </ScrollView>

    )
}
export default StatusCultura;
