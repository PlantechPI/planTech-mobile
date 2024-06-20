import { StyleSheet, Platform } from "react-native";
import { CORES } from "../../../../enum/Cores";

const styles = StyleSheet.create({
  container: {
    flex:1,
    // marginTop: 28,
    // padding: 10,
    backgroundColor: CORES.background
  },
  formView: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20
  },
textoh1:{
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal:10
},
textoh2:{
  fontFamily: 'Roboto',
  fontSize: 18,
  fontWeight: '600',
  color: '#000',
  marginHorizontal:10
},
btnInput:{ 
  height: 50, 
  paddingHorizontal:20, 
  borderRadius:40 ,
  backgroundColor: CORES.branco,
  marginBottom: 20,
  marginTop:2,
  marginHorizontal:5
},
botao:{
  marginVertical: 10
},
tituloPrincipal:{
  width: '100%',
  justifyContent: 'center', 
  alignItems: 'center', 
  backgroundColor: CORES.verde,
  paddingVertical:15,
  paddingHorizontal:20,
},
titulo: {
  fontSize: 16,
  fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
  fontWeight: '900', 
  color: 'white'
},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo semi-transparente
},
modalView: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  minWidth: 300,
  maxWidth: 350,
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
  color: CORES.primaria, // Cor do título
},
modalButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 20,
},
confirmButton: {
  backgroundColor: CORES.primaria,
  padding: 10,
  borderRadius: 5,
},
cancelButton: {
  backgroundColor: CORES.vermelho,
  padding: 10,
  borderRadius: 5,
},
buttonText: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
  });

  export default styles