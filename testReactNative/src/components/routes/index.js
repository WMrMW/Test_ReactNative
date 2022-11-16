
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/home';
import Login from '../screens/login';

/*
import Title from '../title/index';
import Form from '../form/index';
import ResultImc from '../form/resultImc/index';*/


const Stack = createNativeStackNavigator();


export default function Routes(){
    return(
      <Stack.Navigator>
            <Stack.Screen
                name = "Welcome"
                component={Welcome}
            />

            <Stack.Screen
                name = "Login"
                component={Login}
            />
      </Stack.Navigator>
        
    )
}