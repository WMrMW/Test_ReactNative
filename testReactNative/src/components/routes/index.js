import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/home';
import Login from '../screens/login';
import Form from '../screens/calculatorIMC'
import Cadastro from '../screens/cadastro';


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
         
            <Stack.Screen
                name = "Form"
                component={Form}
            />

            <Stack.Screen
                name = "Cadastro"
                component={Cadastro}
            />
      </Stack.Navigator>
        
    )
}