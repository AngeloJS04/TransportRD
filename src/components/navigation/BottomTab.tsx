import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { setSignIn } from '../../redux/slices/Signed/Signed';
import { RootState } from '../../redux/store/store';
import CardScreen from '../../screens/Cards/Card';
import HomeScreen from '../../screens/Home/HomeScreen';
import { LoginScreen } from '../../screens/Login/LoginScreen';
import MapsScreen from '../../screens/Maps/Maps';
import StationsScreen from '../../screens/Stations/StationsScreen';

const Tab = createBottomTabNavigator();

export function BottomTabs() {

    const dispatch = useDispatch();
    const IsSignedIn = useSelector((state: RootState) => state.signIn.SignIn)
    const me = useSelector((state: RootState) => state.me.me.me)
    console.log(me);

    const screenOptions = (route: any, color: any) => {
        let iconName

        switch (route.name) {
            case "Maps":
                iconName = "navigate-outline"
                break;

            case "Card":
                iconName = "card-outline"
                break;

            case "Estaciones":
                iconName = "train-outline"
                break;

            case "Home":
                iconName = "newspaper-outline"
                break
            default:
                iconName = ""
                break;
        }

        return (
            <Icon
                type='ionicon'
                name={iconName}
                size={22}
                color={color}
                tvParallaxProperties={undefined} />
        )
    }

    return (
        <Tab.Navigator

            initialRouteName="Maps"
            // tabBarOption={{ inativeTintColor: '#442484', activeTintColor: '#a17dc3' }}
            screenOptions={({ route }: any) => ({
                tabBarIcon: ({ color }: any) => screenOptions(route, color),
                headerRight: () => (
                    IsSignedIn && <Icon
                        type='ionicon'
                        style={{ marginRight: 30, marginBottom: 4 }}
                        name={'exit-outline'}
                        size={28}
                        color={'#fff'}
                        onPress={() => dispatch(setSignIn(false))}
                        tvParallaxProperties={undefined} />
                )

            })}
        >
            {IsSignedIn ?
                <>
                    <Tab.Screen name="Maps" component={MapsScreen} options={{ title: 'Metros / Omsas', headerShown: false }} />
                    <Tab.Screen name="Card" component={CardScreen} options={{ title: 'Mis tarjetas ', headerShown: false }} />

                    <Tab.Screen name="Home" component={HomeScreen} options={{
                        title: 'Informacion', tabBarBadge: 7, headerStyle: { backgroundColor: '#008349' },
                        headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '500' },
                    }} />


                    {/* <Tab.Screen name="Estaciones" component={StationsScreen} options={{
                        title: 'Estaciones', headerStyle: {
                            backgroundColor: '#008349'
                        }, headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '500' }
                    }} /> */}

                </>
                :
                <>
                    <Tab.Screen name="Login" component={LoginScreen} options={{
                        title: 'Transport App', headerStyle: {
                            backgroundColor: '#008349'
                        }, headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '500' }
                    }} />
                </>

            }
        </Tab.Navigator>
    );
}