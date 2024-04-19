import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

 export default function TabRoutes(){
    return(
        <Tab.Navigator initialRouteName="My_followers">
            {/* <Tab.Screen name="My_followers" component={My_followers}  options={{title: 'Meus seguidores', tabBarActiveTintColor: 'black', tabBarIcon: (focused)=>(<Icon name="bars" size={24} color='black' />), tabBarActiveBackgroundColor:'#EAEAEA'}}/>
            <Tab.Screen name="Favoritos" component={Favoritos} options={{ title: 'Favoritos', tabBarActiveTintColor: 'black', tabBarIcon: (focused)=>(<Icon name="heart" size={24} color='black' />), tabBarActiveBackgroundColor:'#EAEAEA' }} /> */}
        </Tab.Navigator>
    )
 }