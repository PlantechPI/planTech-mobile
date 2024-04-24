import * as React from 'react'; // Importa a biblioteca React de forma explícita
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../views/Inicio'
import Configuracoes from '../views/Configuracoes'
import ListarCulturas from '../views/ListarCulturas'
import { useContext } from "react";
import { AuthContext } from '../context/auth'

export default function StackRoutes() {

    const Stack = createNativeStackNavigator();

    const authContext = useContext(AuthContext);

    const auth = authContext ? authContext.auth : false;

    return (
      <Stack.Navigator>
          {auth ? (
            <React.Fragment>
              <Stack.Screen name="ListarCulturas" component={ListarCulturas} options={{headerShown:true}}/>
              <Stack.Screen name="Configuracoes" component={Configuracoes} options={{headerShown:true}}/>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
            </React.Fragment>
          )}
      </Stack.Navigator>
  );
}
