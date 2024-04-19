import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../views/Inicio'

export default function StackRoutes() {

    const Stack = createNativeStackNavigator();

  return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        </Stack.Navigator>
  );
}