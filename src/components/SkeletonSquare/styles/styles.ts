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
    }
})

export { styles }