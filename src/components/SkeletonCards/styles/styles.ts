import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    item:{
        backgroundColor:'#ECEFF1',
        overflow: 'hidden',
        marginRight: 20,
    },
    skeleton:{
        width: '90%', // Ajuste a largura conforme necessário
        height: '100%', // Ajuste a altura conforme necessário,
        backgroundColor:'#DCE7F0',
    },
    card:{
        width:'100%',
        borderWidth:1,
        borderRadius:10,
        paddingHorizontal:10,
        backgroundColor:'#FFF',
        borderColor:'#e8e8e8',
    },
})

export { styles }