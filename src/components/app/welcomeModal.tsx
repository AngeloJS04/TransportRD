import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import ModalHome from './modal/modal'

const WelcomeModal = ({ active, setActive }: { active: boolean, setActive: Function }) => {
    return (
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

export default WelcomeModal