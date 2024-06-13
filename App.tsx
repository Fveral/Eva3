// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/components/LoginScreen';
import RegistroScreen from './src/components/RegistroScreen';
import HomeScreen from './src/components/HomeScreen';
import DetalleScreen from './src/components/DetalleScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detalle" component={DetalleScreen} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;



