import { StyleSheet } from "react-native";
import { CORES } from "../../../../enum/Cores";

const styles = StyleSheet.create({
    img: {
      marginTop: 120,
      height: 160,
      width: '100%',
      resizeMode:"contain"
    },
    container: {
        flex: 1,
        // marginTop:40,
        justifyContent: 'center',
        alignItems:'center',
        resizeMode: 'cover',
        // opacity: 0.7
    },
      backgroundImage: {
        // flex: 1,
        resizeMode: 'cover', // ou 'contain' para ajustar o tamanho da imagem
        // justifyContent: 'center',
      },
      parteBaixo:{
        flex:1,
        marginBottom:40,
        justifyContent:'flex-end',
        width: '80%',
        gap: 10
      },
      parteCima:{
        marginTop:120
    },
    imageLogo:{
        flex: 1,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      backgroundColor: CORES.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingVertical: 20,
      paddingHorizontal: 40,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    closeButton: {
      textAlign: 'center',
      color: 'blue',
      marginTop: 10,
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
  });

  export default styles