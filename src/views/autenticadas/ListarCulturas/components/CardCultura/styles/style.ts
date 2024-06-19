import { StyleSheet } from "react-native";
import { CORES } from '../../../../../../enum/Cores'

const styles = StyleSheet.create({
    btn:{
        height: '100%',
        width: '100%',
        borderColor: 'black',
        padding: 10,
        borderRadius: 2,
        elevation: 20,
        backgroundColor: CORES.background,
        gap: 5,
        borderBlockColor: 'black'
        
    },
    textoh1:{
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: CORES.background,
    },
    container: {
        height:160,
        width: '85%',
        marginTop: 50,
      },
      centro:{
        alignItems: 'center',
        justifyContent:'center'
      },
      titulo:{
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginHorizontal:10
      },
      boxText: {
        flexDirection: 'row',
        alignItems: 'center', // Isso alinha os itens verticalmente
      },
      icon: {
        marginRight: 5, // Espaço entre o ícone e o texto
      },
      text: {
        fontSize: 16, // Tamanho do texto
        color: '#333', // Cor do texto
      },
      
  });

  export default  styles 