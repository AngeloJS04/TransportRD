import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const ModalHome = ({ active, setActive, children, close = false }: any) => {
    // const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={active}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setActive(!active);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {close && (
                            <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', marginLeft: 250 }}>
                                <Text onPress={() => setActive(!active)} style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>X</Text>
                            </View>
                        )}
                        {children}
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22

    },
    modalView: {
        margin: 20,
        // height: 500,
        // width: 500,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#ff000090",
        fontSize: 2
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default ModalHome;