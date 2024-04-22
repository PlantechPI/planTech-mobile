import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../views/Inicio'
import Logar from '../views/Logar'
import Cadastrar from '../views/Cadastrar'

export default function StackRoutes() {

    const Stack = createNativeStackNavigator();

  return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
            <Stack.Screen name="Logar" component={Logar} options={{headerShown:true}}/>
            <Stack.Screen name="Cadastrar" component={Cadastrar} options={{headerShown:true}}/>
        </Stack.Navigator>
  );
}