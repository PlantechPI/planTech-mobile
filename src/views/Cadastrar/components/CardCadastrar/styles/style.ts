import { StyleSheet } from "react-native";
import { CORES } from '../../../../../enum/Cores'

const styles = StyleSheet.create({
    container: {
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
        backgroundColor: CORES.primaria,
        
    },
    textoh1:{
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        color: CORES.background,
    },
  });

  export default  styles 