import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome, MaterialIcons, FontAwesome6, Ionicons } from '@expo/vector-icons'
import { CORES } from "../enum/Cores";
import { Animated, Text } from 'react-native'; // Importando Animated e Text
import InicialLogado from '../views/InicialLogado'
import Historico from "../views/Historico/listar";
import Configuracoes from "../views/Configuracoes";

const Tab = createBottomTabNavigator();

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
                name="InicialLogado"
                component={InicialLogado}
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
                component={Historico}
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
