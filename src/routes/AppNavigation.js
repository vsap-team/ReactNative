import React from 'react';
import {Text} from 'react-native';
import Login from '../views/Authpages/login';
import Register from '../views/Authpages/Register';
import File from '../views/Authpages/File';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const AuthStack = createNativeStackNavigator();
export default function AppNavigation() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen name="File" component={File} options={{headerShown: false}}/>
      
      <AuthStack.Screen name="Register" component={Register}  />
      
    </AuthStack.Navigator>
  );
}
