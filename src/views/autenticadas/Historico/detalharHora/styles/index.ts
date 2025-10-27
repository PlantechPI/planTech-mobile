import { StyleSheet, Platform } from "react-native";
import { CORES } from "../../../../../enum/Cores";

const styles = StyleSheet.create({
  tituloPrincipal: {
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
  subtitulo: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
    fontWeight: '900', 
    color: '#838383ff',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  subtituloPrincipal: {
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical:15,
    paddingHorizontal:20,
  },
  cards:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
    container: {
    flex: 1,
    backgroundColor: '#fff', // ou a cor que desejar
  },
  });
  

  export default styles