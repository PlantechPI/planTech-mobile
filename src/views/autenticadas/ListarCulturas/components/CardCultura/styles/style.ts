import { StyleSheet } from "react-native";
import { CORES } from '../../../../../../enum/Cores'

const styles = StyleSheet.create({
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
        color: CORES.background,
    },
    container: {
        height:120,
        width: '85%',
        marginTop: 50,
      },
      centro:{
        alignItems: 'center',
        justifyContent:'center'
      },
      titulo:{
        fontWeight:'bold'
      }
  });

  export default  styles 