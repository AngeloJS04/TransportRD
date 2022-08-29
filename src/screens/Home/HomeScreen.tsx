import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useSelector } from 'react-redux'
import ModalHome from '../../components/app/modal/modal'
import { RootState } from '../../redux/store/store'

const HomeScreen = () => {
    const [active, setActive] = useState(true)


    return (
        <View>


            <Text>Home</Text>



            {
                active &&
                <ModalHome active={active} setActive={setActive}>

                    <View style={styles.containerModal}>
                        <Text style={styles.textOne}>¡Bienvenido!</Text>

                        <Text style={styles.textSecondary}>
                            ¡Hola, te damos la bienvenida a Trasnport App, la aplicacion donde podras recargan tus tarjetas del metro,
                            enviar saldo y ver cuando vendra tu proximo transporte.
                        </Text>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setActive(!active)}
                        >
                            <Text style={styles.textStyle}>Continuar</Text>
                        </Pressable>
                    </View>
                </ModalHome>
            }
        </View>


    )
}

const styles = StyleSheet.create({
    containerModal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textOne: {
        fontSize: 30,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: "center",

    },
    textSecondary: {
        fontSize: 18
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20
    },
    buttonClose: {
        backgroundColor: "#398CEA",
        fontSize: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

})

export default HomeScreen