import { StyleSheet } from "react-native";


export const HomeStyles = StyleSheet.create({
    containerCenter: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 10

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
    titleDate: {
        marginVertical: 20,
        fontSize: 22,
        fontStyle: 'italic'
    },

    cardTitle: {
        fontStyle: 'italic',
        color: '#008349'
    },
    cardText: {
        fontSize: 13,
        fontStyle: 'italic',
        fontWeight: '300',
        marginBottom: 5
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
    daySchedule: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff'


    },
    containerDay: {
        backgroundColor: '#008349',
        borderRadius: 7
    }
})