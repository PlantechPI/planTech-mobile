import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../views/Inicio'
import Logar from '../views/InicialLogado'
import Cadastrar from '../views/Cadastrar'

export default function StackRoutes() {

    const Stack = createNativeStackNavigator();

  return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        </Stack.Navigator>
  );
}