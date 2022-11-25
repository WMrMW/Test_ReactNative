import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastro from '../screens/cadastro';
import Login from '../screens/login';
import MyTabs from '../screens/principal';


const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Cadastro"
                component={Cadastro}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Principal"
                component={MyTabs}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}