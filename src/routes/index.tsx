import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './Stack.routes';
import TabRoutes from './Tab.routes';
import { useContext } from 'react';
import { AuthContext } from '../context/auth'; // Importe o contexto AuthContext corretamente

export default function Routes() {
    const { id_cultura, setIdCultura} = useContext(AuthContext);  

    // Verifique se AuthContext não é undefined antes de acessar a propriedade auth
    // const auth = authContext ? authContext.auth : false;

    return (
        <NavigationContainer>
            {id_cultura == '' ? <StackRoutes /> : <TabRoutes />}
            {/* <TabRoutes /> */}
        </NavigationContainer>
    );
}
