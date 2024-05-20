import { StyleSheet, Dimensions } from "react-native";
import { CORES } from "../../../../../enum/Cores";

const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 5
  },
  conteudo:{
    flex:1,
    flexDirection: 'row',
    marginTop: 5,
    flexWrap:'wrap',
    justifyContent:'center'
  },
  text:{
    margin:10
  },
  cardPrinpipal:{
    width:'90%',
    height:240,
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
    width:20, 
    backgroundColor: CORES.verde,
    height: '100%', 
    marginRight: 10, 
  },
  logs:{
    width:'90%',
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
    height: height/1.7,
    justifyContent: 'center',
    alignItems: 'center',
},
tituloMedia: {
  flexDirection: 'row',
  alignItems: 'center',
},
titulo:{
  fontWeight:'bold',
  justifyContent:'center',
  fontSize:16
}
  });

  export default styles