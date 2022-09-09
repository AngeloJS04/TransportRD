import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../../fb';
import { useForm } from '../../../hooks/useForm';
import { setCards } from '../../../redux/slices/cards/cards';
import { RootState } from '../../../redux/store/store';
import ModalHome from '../../app/modal/modal';

const AddCard = ({ setShowModalAdd }: any) => {
    const card = 'https://pbs.twimg.com/media/Dob2TJOU8AE8SR3.jpg';
    const dispatch = useDispatch();
    const cards = useSelector((state: RootState) => state.cards.cards)

    const [codeErrors, SetCodeErrors] = useState<string[]>([]);
    const { code, onChange, clear, setState }: any = useForm({ code: '' });

    const [listCards, setListCards]: any[] = useState([])

    useEffect(() => {
        const getCards = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'globalCards'))
                const docs: any[] = []
                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data() })
                })
                setListCards(docs)
            } catch (error) {
                console.log(error)
            }
        }
        getCards()
    }, [])

    const handleSubmit = () => {
        if (code.length < 19) {
            SetCodeErrors(["el codigo debe contener 16 digitos"])
            return
        }
        const foundCard = listCards.find(((card: { id: string; }) => card.id === code.replaceAll(' ', '')))

        if (foundCard === undefined) {
            SetCodeErrors(["Esta tarjeta no existe"])
            return
        }

        if (cards.find(((item) => item.id === foundCard.id))) {
            SetCodeErrors(["Esta tarjeta ya existe"])
            return
        }

        dispatch(setCards([...cards, foundCard]))

        SetCodeErrors([])
        setShowModalAdd(false)
    }

    return (
        <View >
            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', margin: 'auto' }}>
                <Image source={{ uri: card }} style={{ width: 300, height: 150, marginTop: 90, borderRadius: 10, marginRight: 230 }} />
            </View>
            <ModalHome>
                <View>
                    <Text style={{ fontSize: 22, fontStyle: 'italic', marginBottom: 10, fontWeight: 'bold' }}>Ingresa el codigo de la tarjeta</Text>
                    <Text style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 20, fontWeight: 'bold', textAlign: 'center' }}>Este puedes encontrarlo en al parte trasera de tu tarjeta</Text>
                    <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold', marginLeft: 18 }}>Codigo:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        placeholder="Ingresa un monto"
                        maxLength={19}
                        onChangeText={(value) => onChange(value, "code")}
                        value={code.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()}
                    />
                    <Text style={{ color: 'red', marginLeft: 30 }}>{codeErrors[0]}</Text>
                    <View style={[styles.containerImg, { justifyContent: 'center', marginTop: 10 }]}>
                        <TouchableOpacity onPress={() => setShowModalAdd(false)} style={[styles.button, { backgroundColor: '#FF4040' }]}>
                            <Text style={{ color: '#fff' }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: '#3E8500', paddingHorizontal: 26 }]}>
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