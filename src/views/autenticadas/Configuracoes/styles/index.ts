import { StyleSheet, Platform } from "react-native";
import { CORES } from "../../../../enum/Cores";

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 28,
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
  });

  export default styles