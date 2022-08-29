
import { StyleSheet } from "react-native";

export const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',


    },
    login: {
        width: 350,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',



    },
    bandera: {
        width: 28,
        height: 30,
        marginTop: 40,
        marginRight: 20,
        marginBottom: 10,
        borderRadius: 50,
        alignItems: 'flex-end',
        justifyContent: 'flex-start'


    },
    logo: {
        width: 38,
        height: 50,
        marginVertical: 60,
        marginHorizontal: 10

    },
    cableWay: {
        width: 50,
        height: 50,
        marginVertical: 60,
        marginHorizontal: 10
    },
    omsa: {
        width: 80,
        height: 50,
        marginVertical: 60,
        marginHorizontal: 10

    },

    containerImg: {
        display: 'flex',
        flexDirection: 'row'
    },

    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 1,
        marginVertical: 30

    },
    input: {
        width: 250,
        height: 40,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        marginBottom: 20
    },
    button: {

        height: 40,
        borderRadius: 10,

        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
        borderColor: '#fff',
        color: '#fff',
        borderWidth: 1

    }
});
