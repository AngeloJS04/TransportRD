import React, { useEffect, useState } from 'react'
import { TextInput, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { useForm } from '../../../hooks/useForm'
import ModalHome from '../../app/modal/modal'

const AddCard = ({ setShowModalAdd }: any) => {
    const card = 'https://pbs.twimg.com/media/Dob2TJOU8AE8SR3.jpg'
    const { code, onChange }: any = useForm({ code: '' });

    useEffect(() => {
        console.log(code);
    }, [code])


    return (
        <View >
            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', margin: 'auto' }}>
                <Image source={{ uri: card }} style={{ width: 300, height: 150, marginTop: 90, borderRadius: 10, marginRight: 230 }} />
            </View>
            <ModalHome>
                <View>
                    <Text style={{ fontSize: 22, fontStyle: 'italic', marginBottom: 10, fontWeight: 'bold' }}>Ingresa el codigo de la tarjeta</Text>
                    <Text style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 20, fontWeight: 'bold', textAlign: 'center' }}>Este puedes encontrarlo en al parte trasera de tu tarjeta</Text>
                    <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold', marginLeft: 18 }}>Codigo</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        placeholder="Ingresa un monto"
                        onChangeText={(value) => onChange(value, "code")}
                        value={code}
                    />
                    <View style={[styles.containerImg, { justifyContent: 'center' }]}>
                        <TouchableOpacity onPress={() => setShowModalAdd(false)} style={[styles.button, { backgroundColor: '#FF4040' }]}>
                            <Text style={{ color: '#fff' }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#3E8500' }]}>
                            <Text style={{ color: '#fff' }}>Añadir</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ModalHome>

        </View>
    )
}

export const styles = StyleSheet.create({


    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 30
    },
    containerImg: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        marginHorizontal: 10,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
        borderColor: '#ccc',

        color: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 20

    }
})

export default AddCard