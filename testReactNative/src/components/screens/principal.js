import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Form from '../screens/calculatorIMC';
import { Entypo, Feather } from '@expo/vector-icons';
import React, { useState , useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Button, ScrollView,StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MyTabs() {


   const [user, setUser] = useState('');

   useEffect( () => {
    async function getUser(){
        let response = await AsyncStorage.getItem('userData');
        let json = JSON.parse(response);
        setUser(json.name)
    }
    getUser();
   }, []);



    return (
    <ScrollView>

        
        <Tab.Navigator
            screenOptions={{
                style: {
                    backgroundColor: '#FFFF',
                    borderTopColor: 'transparent',
                },
                tabBarActiveTintColor: '#8bfaff',
                tabBarStyle: {
                    paddingTop: 2,
                    paddingBottom: 2
                },
            }}
        >

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name='home' size={size} color={color} />
                    ),
                    title: '',
                    headerTransparent: true,
                    headerShown: false
                }}
            />
            
            <Tab.Screen
                name="Dados"
                component={Form}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather name='user' size={size} color={color} />
                    ),
                    title: '',
                    headerTransparent: true,
                    headerShown: false
                }}
            />
        </Tab.Navigator>
        <Text style={styles.textBemVindo} >Seja Bem vindo {user}</Text>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
textBemVindo: {
    fontSize: 25,
    color: '#1b065e',
    padding: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
},
})