import { StyleSheet } from "react-native";


export const HomeStyles = StyleSheet.create({
    containerCenter: {
        display: 'flex',
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20
        // flexGrow: 4

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
    },
    containerSpecific: {
        display: 'flex',
        width: '47%',
        marginVertical: 8
        // gap: 10
    },
    checkContainer: {

        borderRadius: 15, shadowColor: '#ccc', shadowOpacity: 0.1, shadowOffset: {
            width: 10,
            height: 2
        },
        shadowRadius: 8
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 16,
        elevation: 3,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.24,
        shadowRadius: 4,
        // borderRadius: 8

    },
    buttonsLine: {
        padding: 10, borderRadius: 20, height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 8,
        borderColor: '#fff',
        borderWidth: 1,
        width: 350
    }
})