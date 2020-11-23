// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';

import AdList from './components/AdList';
import AdDetails from './components/AdDetails';
import AdNew from './components/AdNew';
import AdUpdate from './components/AdUpdate';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Visi skelbimai" component={AdList} />
          <Stack.Screen name="Skelbimo info" component={AdDetails} />
          <Stack.Screen name="Naujas skelbimas" component={AdNew} />
          <Stack.Screen name="Atnaujinti" component={AdUpdate} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
