import { BlurView } from 'expo-blur';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { firebaseConfig } from '../../../fb';
import { useForm } from '../../hooks/useForm';
import { identificationU } from '../../interface/Login.interface';
import { setMe } from '../../redux/slices/me/me';
import { LoginStyle } from '../../theme/Login.style';
import { setSignIn } from '../../redux/slices/Signed/Signed';

const Stack = createNativeStackNavigator()

// const uri = 'https://i.blogs.es/b4dd5c/maps/1366_2000.png';
const profile = 'https://dev.chromeandwhyte.com/wp-content/uploads/2022/07/User-Profile-PNG.png';
const metro = 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Logo_Metro_de_Santo_Domingo.png';
const omsa = 'http://www.estrellasorientales.com.do/wp-content/uploads/2018/10/logo-omsa.jpg';
const cableWay = 'https://www.telefericosantodomingo.com/images/teleferico-santo-domingo-icon.png';
const bandera = 'https://images.visitarepublicadominicana.org/bandera-de-republica-dominicana.jpg';



const initialState = {
    Nombres: '',
    Apellido1: '',
    Apellido2: '',
    foto: '',
    email: ''
}

export function LoginScreen() {

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    const [isCreate, SetIsCreate] = useState(false)
    const debounceRef = useRef<NodeJS.Timeout>()

    const dispatch = useDispatch();

    const [identification, setIdentification] = useState<identificationU>(initialState)

    const { email, password, onChange } = useForm({ email: "", password: "", Nombres: "", Apellidos1: '', Apellidos2: '' });
    const dataUser = [identification]

    const onQueryChanged = (id: string) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(() => { idUser(id) }, 700)
    }

    const idUser = (id: string) => {
        fetch(`https://api.adamix.net/apec/cedula/${id}`)
            .then(response => response.json())
            .then(data => {
                if (!data.ok) return
                // dispatch(setMe({ me: { email: data.email, uid: data.uid }, haveData: true }))
                setIdentification(data)

            });
    }

    const handleChange = (id: string) => { onQueryChanged(id) }

    const handleCreateAccount = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Account Created')
                const user = userCredential.user;
            })
            .catch(err => { console.log(err) })

        SetIsCreate(false)
        setIdentification(initialState)

    }

    const handleSignIn = async () => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('sign in')
                const user = userCredential.user;

                // console.log(user)
                dispatch(setSignIn({ SignIn: true }))
                dispatch(setMe({ me: { email: user.email, uid: user.uid } }))
            })
            .catch((err) => {
                console.log(err)
                Alert.alert(err)
            })
    }


    const goBack = () => {
        SetIsCreate(false)
        setIdentification(initialState)

    }

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
            }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={LoginStyle.container}>
                <Image source={require("../../../assets/img/maps.png")} style={[LoginStyle.image, StyleSheet.absoluteFill]} blurRadius={3} />
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Image source={{ uri: bandera }} style={LoginStyle.bandera} />
                </View>

                <ScrollView contentContainerStyle={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <BlurView intensity={100}>
                        <View style={[LoginStyle.login, !isCreate ? { marginTop: 0 } : { marginTop: 88, }]}>
                            <Image source={{ uri: profile }} style={LoginStyle.profile} />
                            {!isCreate ?
                                <View>

                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#000' }}>Email</Text>
                                        <TextInput onChangeText={(value) => onChange(value, "email")} value={email} style={LoginStyle.input} placeholder="example@example.com" />
                                    </View>

                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#000' }}>Password</Text>
                                        <TextInput onChangeText={(value) => onChange(value, "password")} value={password} style={LoginStyle.input} placeholder="password" secureTextEntry={true} />
                                    </View>
                                    <TouchableOpacity onPress={handleSignIn} style={[LoginStyle.button, { backgroundColor: '#0d6efd90', width: 250 }]}>
                                        <Text style={{ color: '#fff' }}>Iniciar Sesion</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => SetIsCreate(true)} style={[LoginStyle.button, { backgroundColor: '#ccc', width: 250, }]}>
                                        <Text style={{ color: '#fff' }}>Crear Cuenta</Text>
                                    </TouchableOpacity>

                                </View>

                                :

                                <View>

                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#000' }}>Cedula</Text>
                                        <TextInput onChangeText={(value) => handleChange(value)} style={LoginStyle.input} placeholder="cedula sin guiones" />
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#000' }}>Password</Text>
                                        <TextInput onChangeText={(value) => onChange(value, "password")} value={password} style={LoginStyle.input} placeholder="password" secureTextEntry={true} />
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#000' }}>Nombres</Text>
                                        <TextInput onChangeText={(value) => onChange(value, "Nombres")} defaultValue={identification.Nombres ? identification.Nombres : ''} style={LoginStyle.input} placeholder="Ingresa tu nombre" />
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#000' }}>Apellidos</Text>
                                        <TextInput onChangeText={(value) => onChange(value, "Apellidos1")} defaultValue={identification.Apellido1 ? `${identification.Apellido1} ${identification.Apellido2}` : ''} style={LoginStyle.input} placeholder="Ingresa tus apellidos" />
                                    </View>

                                    <View>
                                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#000' }}>Email</Text>
                                        <TextInput onChangeText={(value) => onChange(value, "email")} value={email} style={LoginStyle.input} placeholder="example@example.com" />
                                    </View>



                                    <View style={[LoginStyle.containerImg, { justifyContent: 'center' }]}>
                                        <TouchableOpacity onPress={goBack} style={[LoginStyle.button, { backgroundColor: '#0d6efd90', width: 120, }]}>
                                            <Text style={{ color: '#fff' }}>Volver</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleCreateAccount} style={[LoginStyle.button, { backgroundColor: '#0d6efd90', width: 120, }]}>
                                            <Text style={{ color: '#fff' }}>Registrarse</Text>
                                        </TouchableOpacity>

                                    </View>


                                </View>
                            }

                        </View>
                    </BlurView>
                    <View style={LoginStyle.containerImg}>
                        <Image source={{ uri: metro }} style={LoginStyle.logo} />
                        <Image source={{ uri: omsa }} style={LoginStyle.omsa} />
                        <Image source={{ uri: cableWay }} style={LoginStyle.cableWay} />
                    </View>
                </ScrollView>

            </View>
        </KeyboardAvoidingView>
    )
}

