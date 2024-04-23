import { StyleSheet } from "react-native";
import { CORES } from '../../../enum/Cores'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  halfBackground: {
    flex: 0.2, // Metade da tela
    backgroundColor: CORES.primaria, // Cor de fundo desejada
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject, // Ocupa toda a tela
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  card: {
    height:300,
    width: '80%',
    marginTop: 50
  }
  });

  export default styles