import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home/HomeScreen';
import { Icon } from 'react-native-elements';
import CardScreen from '../../screens/Cards/Card';
import StationsScreen from '../../screens/Stations/StationsScreen';
import MapsScreen from '../../screens/Maps/Maps';
import { LoginScreen } from '../../screens/Login/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { Alert, Button } from 'react-native';
import { setSignIn } from '../../redux/slices/Signed/Signed';

const Tab = createBottomTabNavigator();

export function BottomTabs() {

    const dispatch = useDispatch();
    const IsSignedIn = useSelector((state: RootState) => state.signIn)


    const screenOptions = (route: any, color: any) => {
        let iconName

        switch (route.name) {
            case "Maps":
                iconName = "map-search-outline"
                break;

            case "Card":
                iconName = "cards-outline"
                break;

            case "Estaciones":
                iconName = "map-marker-multiple-outline"
                break;

            case "Home":
                iconName = "home-outline"
                break
            default:
                iconName = ""
                break;
        }

        return (
            <Icon
                type='material-community'
                name={iconName}
                size={22}
                color={color}
                tvParallaxProperties={undefined} />
        )
    }
    // const theme = useSelector((state) => state.themeReducer.theme);
    return (
        <Tab.Navigator

            initialRouteName="Home"
            // tabBarOption={{ inativeTintColor: '#442484', activeTintColor: '#a17dc3' }}
            screenOptions={({ route }: any) => ({
                tabBarIcon: ({ color }: any) => screenOptions(route, color),
                // headerRight: () => (
                //     <Icon
                //         type='material-community'
                //         style={{ marginRight: 20 }}
                //         name={'exit-to-app'}
                //         size={22}
                //         color={'#000'}
                //         onPress={() => {
                //             return dispatch(setSignIn({ SignIn: false }))
                //         }}
                //         tvParallaxProperties={undefined} />
                // )

            })}
        >
            {IsSignedIn ?
                <>
                    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
                    <Tab.Screen name="Maps" component={MapsScreen} options={{ title: 'Metros / Omsas' }} />
                    <Tab.Screen name="Card" component={CardScreen} options={{ title: 'Mis tarjetas ', headerShown: false }} />
                    <Tab.Screen name="Estaciones" component={StationsScreen} options={{ tabBarBadge: 12, title: 'Estaciones' }} />

                </>
                :
                <>
                    <Tab.Screen name="Login" component={LoginScreen} options={{ title: 'Grupo 7', headerShown: false }} />
                </>

            }
        </Tab.Navigator>
    );
}