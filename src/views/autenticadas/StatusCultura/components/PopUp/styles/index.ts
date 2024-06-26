import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container:{
    width:180,
    height:120,
    borderRadius:10,
    elevation:3,
    backgroundColor:'#FFF',

    justifyContent:'center',
    alignItems:'center',
    paddingVertical:15,
    marginHorizontal:5,
    marginVertical:5,

    shadowColor:'#000',
    shadowOpacity:0.1,
    shadowOffset: { width:0, height:2 },
    zIndex:999
},
  box:{
    flex:1,
    flexDirection:'row',
  },
  informacoes:{
    alignItems:'center',
    justifyContent:'center',
    width:'80%',
  },
  icone:{
    width:'20%',
    alignItems:'center',
    justifyContent:'center',
    // paddingLeft:2
  },
  textoLabel:{
    color: '#7f7f7f', // Cinza
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto', // Uma fonte amigável comum
    fontWeight: '700', // Aumenta a grossura da letra
    marginBottom: 10,
    textAlign: 'center', // Opcional: centraliza o texto
  },
  textoInformacao:{
    fontSize: 16,
    justifyContent:'space-around',
    fontWeight: '900'
  },
  fundoIcone:{
    backgroundColor: 'rgb(240, 245, 252)',
    height: '50%',
    width: '70%',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 20
  }
  });

  export default styles