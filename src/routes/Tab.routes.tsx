import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome, MaterialIcons, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { CORES } from "../enum/Cores";
import { Animated, Text } from 'react-native'; // Importando Animated e Text
import StatusCultura from '../views/autenticadas/StatusCultura'
import Historico from "../views/autenticadas/Historico/listar";
import Configuracoes from "../views/autenticadas/Configuracoes";
import HistoricoDetalhado from '../views/autenticadas/Historico/detalhar/listar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const HistoricoStack = createNativeStackNavigator();

const HistoricoScreens = () =>{
    return(
        <HistoricoStack.Navigator>
            <HistoricoStack.Screen name="Historico listado" component={Historico} options={{ headerShown: false }}/>
            <HistoricoStack.Screen name="HistoricoDetalhado" component={HistoricoDetalhado} />
        </HistoricoStack.Navigator>
    )
}

export default function TabRoutes(){
    return(
        <Tab.Navigator
            initialRouteName="InicialLogado"
            screenOptions={({ route }) => ({
                tabBarLabel: ({ focused }) => {
                    if (focused) {
                        return <Text style={[{fontSize:12}]}>{route?.params?.title}</Text>;
                    } else {
                        return null;
                    }
                    
                },
                tabBarStyle: {
                    height: 60 // Aumenta o tamanho da tab navigation
                },
                tabBarActiveBackgroundColor: CORES.background,
                // Remove o cabeçalho (header) da tab navigator
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="StatusCultura"
                component={StatusCultura}
                initialParams={{ title: 'Status Cultura' }} // Definindo os parâmetros iniciais para esta rota
                options={{
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({ focused }) => (
                        <Animated.View style={{ transform: [{ scale: focused ? new Animated.Value(1.3) : new Animated.Value(1) }] }}>
                            <Ionicons name="partly-sunny-outline" size={24} color='#000' />
                        </Animated.View>
                    ),
                }}
            />
            <Tab.Screen
                name="Historico"
                component={HistoricoScreens}
                initialParams={{ title: 'Histórico' }} // Definindo os parâmetros iniciais para esta rota
                options={{
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({ focused }) => (
                        <Animated.View style={{ transform: [{ scale: focused ? new Animated.Value(1.3) : new Animated.Value(1) }] }}>
                            <AntDesign name="calendar" size={24} color='#000' />
                        </Animated.View>
                    ),
                }}
            />
            <Tab.Screen
                name="Configuracoes"
                component={Configuracoes}
                initialParams={{ title: 'Configurações' }} // Definindo os parâmetros iniciais para esta rota
                options={{
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({ focused }) => (
                        <Animated.View style={{ transform: [{ scale: focused ? new Animated.Value(1.3) : new Animated.Value(1) }] }}>
                            <AntDesign name="setting" size={24} color='#000' />
                        </Animated.View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
