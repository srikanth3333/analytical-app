import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import Splash from '../../pages/auth/Splash';

const Stack = createNativeStackNavigator();

const index = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                 screenOptions={{
                    headerShown: false, 
                  }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Splash" component={Splash} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default index
