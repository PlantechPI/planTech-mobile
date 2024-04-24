import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InicialLogado from '../views/InicialLogado'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

 export default function TabRoutes(){
    return(
        <Tab.Navigator initialRouteName="My_followers">
            <Tab.Screen name="InicialLogado" component={InicialLogado}  options={{title: 'Meus seguidores', tabBarActiveTintColor: 'black', tabBarIcon: (focused)=>(<FontAwesome name="user" size={24} color='black' />), tabBarActiveBackgroundColor:'#EAEAEA'}}/>

            {/* <Tab.Screen name="Favoritos" component={Favoritos} options={{ title: 'Favoritos', tabBarActiveTintColor: 'black', tabBarIcon: (focused)=>(<Icon name="heart" size={24} color='black' />), tabBarActiveBackgroundColor:'#EAEAEA' }} /> */}
        </Tab.Navigator>
    )
 }