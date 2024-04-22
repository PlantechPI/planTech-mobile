import { StyleSheet } from "react-native";
import { CORES } from '../../../enum/Cores'

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
        height: 60,
    },
    btn:{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: CORES.primaria,
        
    },
    textoBtn:{
        fontFamily: 'Roboto',
        color: 'white',
    },

  });

  export default  styles 