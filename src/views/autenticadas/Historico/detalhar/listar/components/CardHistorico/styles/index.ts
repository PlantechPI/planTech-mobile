import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container:{
    width:160,
    height:120,
    borderRadius:10,
    elevation:3,
    backgroundColor:'#FFF',

    justifyContent:'center',
    alignItems:'center',
    paddingVertical:15,
    marginHorizontal:5,
    marginVertical:5,

    shadowColor:'#000',
    shadowOpacity:0.1,
    shadowOffset: { width:0, height:2 },
    zIndex:999
},
  });

  export default styles