import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './Stack.routes'

export default function Routes(){
    // const loginContext = useContext(LoginContext)

    return(
        <NavigationContainer>
            {/* {loginContext.auth ? <TabRoutes />: <StackRoutes /> } */}
            <StackRoutes/>
        </NavigationContainer>
    )
}