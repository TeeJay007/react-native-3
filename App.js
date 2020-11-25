// import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';

import AdList from './components/AdList';
import AdDetails from './components/AdDetails';
import AdNew from './components/AdNew';
import AdUpdate from './components/AdUpdate';

import UserLogin from './components/UserLogin';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { MaterialIcons } from '@expo/vector-icons'; 
import AdFilteredList from './components/AdFilteredList';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;

      if (route.name === 'Visi') {
        iconName = 'assignment';
      } else if (route.name === 'Mano') {
        iconName = 'assignment-ind';
      }

      return <MaterialIcons name={iconName} size={size} color={color} />;
    },
  })}>
    <Tab.Screen name="Visi" component={AdList} />
    <Tab.Screen name="Mano" component={AdFilteredList} />
  </Tab.Navigator>
)

export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Prisijungimas" component={UserLogin} />
            <Stack.Screen name="Skelbimai" component={Home} />
            <Stack.Screen name="Skelbimo info" component={AdDetails} />
            <Stack.Screen name="Naujas skelbimas" component={AdNew} />
            <Stack.Screen name="Atnaujinti" component={AdUpdate} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
