import * as React from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import store from './store';
import CartScreen from './src/CartScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CartScreen" component={CartScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App

