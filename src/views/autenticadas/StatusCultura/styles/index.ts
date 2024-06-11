import { StyleSheet, Platform } from "react-native";
import { CORES } from "../../../../enum/Cores";

const styles = StyleSheet.create({

  cards: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titulo: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
    fontWeight: '900', 
    color: 'white'
  },
  tituloPrincipal: {
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: CORES.verde,
    paddingVertical:15,
    paddingHorizontal:20,
  },
  tituloSecundario:{
      width: '100%',
      alignItems: 'center', 
      backgroundColor: '#E8E8E8',
      paddingVertical:15,
      paddingHorizontal:20,
      flexDirection:'row'
  },
  textTitulo:{
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
    fontWeight: '900', 
    color: 'black'
  },
  viewCards:{
    justifyContent:'center',
    alignItems:'center',
  }
});

export default styles;
