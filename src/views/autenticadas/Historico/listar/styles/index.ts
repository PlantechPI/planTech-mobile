import { StyleSheet, Platform } from "react-native";
import { CORES } from "../../../../../enum/Cores";

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    marginTop: 28
    
  },
  conteudo:{
    flex:1,
    flexDirection: 'row',
    marginTop: 10,
    flexWrap:'wrap',
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