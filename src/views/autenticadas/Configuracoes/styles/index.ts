import { StyleSheet } from "react-native";
import { CORES } from "../../../../enum/Cores";

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'flex-start',
    marginTop: 40,
    padding: 10,
    justifyContent:'space-between'
  },
  modalView: {
    backgroundColor: CORES.background,
    width: '100%'
  },
textoh1:{
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
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
}
  });

  export default styles