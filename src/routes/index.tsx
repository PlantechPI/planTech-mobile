import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './Stack.routes';
import TabRoutes from './Tab.routes';
import { useContext } from 'react';
import { AuthContext } from '../context/auth'; // Importe o contexto AuthContext corretamente

export default function Routes() {
    const authContext = useContext(AuthContext); // Use o hook useContext para acessar o contexto AuthContext

    // Verifique se AuthContext não é undefined antes de acessar a propriedade auth
    const auth = authContext ? authContext.auth : false;

    return (
        <NavigationContainer>
            {auth ? <TabRoutes /> : <StackRoutes />}
        </NavigationContainer>
    );
}
