import { StyleSheet } from "react-native";
import { CORES } from "../../../../../enum/Cores";

const styles = StyleSheet.create({
  container: {
    flex:1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 5
  },
  conteudo:{
    flex:1,
    flexDirection: 'row',
    marginTop: 10,
    flexWrap:'wrap',
    justifyContent:'center'
  },
  text:{
    margin:10
  },
  cardPrinpipal:{
    width:'90%',
    height:200,
    borderRadius:10,
    elevation:3,
    backgroundColor:'#FFF',
    flexDirection: 'row',

    alignItems:'center',

    marginVertical:5,

    shadowColor:'#000',
    shadowOpacity:0.1,
    shadowOffset: { width:0, height:2 },
    zIndex:999
  },

  centro:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  lateralColorida:{
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    width:20, // 2% da largura da tela
    backgroundColor: CORES.verde,
    height: '100%', // Garantindo que a altura seja igual à altura do card
    marginRight: 10, 
  },
  logs:{
    width:'90%',
    // height:100,
    borderRadius:10,
    elevation:3,
    backgroundColor:'#FFF',
    padding: 20,

    alignItems:'center',
    marginVertical:5,

    shadowColor:'#000',
    shadowOpacity:0.1,
    shadowOffset: { width:0, height:2 },
    zIndex:999

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  });

  export default styles