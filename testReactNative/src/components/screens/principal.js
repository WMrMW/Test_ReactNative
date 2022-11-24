import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Form from '../screens/calculatorIMC';
import { Entypo, Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
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
    )
}