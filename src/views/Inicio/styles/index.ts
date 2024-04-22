import { StyleSheet } from "react-native";

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
    }
  });

  export default styles