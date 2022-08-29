
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';
import { BottomTabs } from './src/components/navigation/BottomTab';
import { store } from './src/redux/store/store';
import HomeScreen from './src/screens/Home/HomeScreen';
import { LoginScreen } from './src/screens/Login/LoginScreen';
const Stack = createNativeStackNavigator()


export default function App() {
  return (

    <Provider store={store}>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="login"> */}
        <BottomTabs />
        {/* <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} /> */}
        {/* </Stack.Navigator> */}
      </NavigationContainer>
    </Provider>
  );
}

