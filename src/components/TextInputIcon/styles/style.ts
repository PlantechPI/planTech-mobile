import { StyleSheet } from "react-native";
import { CORES } from '../../../enum/Cores'

const styles = StyleSheet.create({
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
        borderRadius:9 ,
        backgroundColor: CORES.branco,
        marginBottom: 20,
        marginTop:2,
        marginHorizontal:5
      },

  });

  export default  styles 