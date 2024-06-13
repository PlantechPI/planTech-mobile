import { StyleSheet, Dimensions, Platform } from "react-native";
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
    height:260,
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
  justifyContent:'center'
},
// titulo:{
//   fontWeight:'bold',
//   justifyContent:'center',
//   fontSize:22
// },
texto:{
  fontFamily: 'Roboto',
  fontSize: 16,
  // fontWeight: 'bold',
  color: '#000',
  marginHorizontal:10
},
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

  export default styles