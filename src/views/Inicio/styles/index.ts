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
        flexDirection: 'column',
        justifyContent:'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    input: {
        height: 40,
        width: '100%',
        margin: 8,
        borderWidth: 1,
        paddingHorizontal: 5
    },
    button:{
        width: '100%',
        margin: 8
    },
    keyboardAvoidingView:{
        flex:1,
        flexDirection: 'column',
        justifyContent:'space-between',
    },
    box: {
        backgroundColor: '#61dafb',
        width: 80,
        height: 80,
        borderRadius: 4,
      },
  });

  export default styles