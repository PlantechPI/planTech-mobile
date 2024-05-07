import { StyleSheet } from "react-native";
import { CORES } from '../../../../enum/Cores'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  halfBackground: {
    flex: 0.2, // Metade da tela
    backgroundColor: CORES.primaria, // Cor de fundo desejada
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject, // Ocupa toda a tela
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  card: {
    height:250,
    width: '85%',
    marginTop: 50
  },
  box: {
    // flex: 1,
    width: '100%',
    height: '100%',
},
btn:{
    height: '100%',
    width: '100%',
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: CORES.background,
    
},
textoh1:{
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal:5
},
btnInput:{ 
  height: 40, 
  padding:10, 
  borderRadius:40 ,
  backgroundColor: CORES.branco,
  marginBottom: 20,
  marginTop:2,
  marginHorizontal:5
},
});

  export default styles