import * as React from 'react'; // Importa a biblioteca React de forma explícita
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../views/desautenticadas/Inicio'
import Configuracoes from '../views/autenticadas/Configuracoes'
import ListarCulturas from '../views/autenticadas/ListarCulturas'
import { useContext } from "react";
import { AuthContext } from '../context/auth'

export default function StackRoutes() {

    const Stack = createNativeStackNavigator();

    const authContext = useContext(AuthContext);

    const auth = authContext.auth;

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
