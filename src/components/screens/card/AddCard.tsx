import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../../fb';
import { useForm } from '../../../hooks/useForm';
import { AddCardI } from '../../../interface/card.interface';
import { setCards } from '../../../redux/slices/cards/cards';
import { RootState } from '../../../redux/store/store';
import { CardsI } from '../../../redux/types/card.type';
import { CardStyle } from '../../../theme/Card.style';
import ModalHome from '../../app/modal/modal';

const cardPhoto = 'https://pbs.twimg.com/media/Dob2TJOU8AE8SR3.jpg';

const AddCard = ({ setShowModalAdd }: AddCardI) => {

    const dispatch = useDispatch();
    const cards = useSelector((state: RootState) => state.cards.cards)

    const [codeErrors, SetCodeErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false)
    const [listCards, setListCards]: any[] = useState([])

    const { code, onChange } = useForm({ code: '' });


    const getCards = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'globalCards'))
            const docs: any[] = []
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), uid: doc.id })
            })
            setListCards(docs)

        } catch (error) { console.log(error) }
    }

    useEffect(() => { getCards() }, [])

    const handleSubmit = () => {
        if (code.length < 19) { SetCodeErrors(["el codigo debe contener 16 digitos"]); return }

        const foundCard: CardsI = listCards.find(((card: CardsI) => card?.id === (Platform.OS === 'android' ? code.replace(/\s/g, "") : code.replaceAll(' ', ''))))

        if (foundCard === undefined) { SetCodeErrors(["Esta tarjeta no existe"]); return }

        if (cards.find(((item) => item.id === foundCard.id))) { SetCodeErrors(["Esta tarjeta ya existe"]); return }

        setLoading(true)
        dispatch(setCards([...cards, foundCard]))

        SetCodeErrors([])

        setTimeout(() => {
            setLoading(false)
            setShowModalAdd(false)
        }, 1500);
    }

    return (
        <View >

            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', margin: 'auto' }}>
                <Image source={{ uri: cardPhoto }} style={{ width: 300, height: 150, marginTop: 70, borderRadius: 10, marginRight: 230 }} />
            </View>

            <ModalHome>
                <View>
                    <Text style={{ fontSize: 22, fontStyle: 'italic', marginBottom: 10, fontWeight: 'bold' }}>Ingresa el codigo de la tarjeta</Text>
                    <Text style={{ fontSize: 12, fontStyle: 'italic', marginBottom: 20, fontWeight: 'bold', textAlign: 'center' }}>Este puedes encontrarlo en al parte trasera de tu tarjeta</Text>
                    <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold', marginLeft: 18 }}>Codigo:</Text>

                    {loading && (
                        <View style={{ padding: 0, width: 110, marginLeft: 90, borderRadius: 10 }}>
                            <ActivityIndicator
                                size={'large'}
                                color={'#4A9CD5'}
                                animating={true}

                            />
                        </View>
                    )}
                    <TextInput
                        style={CardStyle.input}
                        keyboardType='numeric'
                        placeholder="Ingresa un monto"
                        maxLength={19}
                        onChangeText={(value) => onChange(value, "code")}
                        value={code.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()}
                    />
                    <Text style={{ color: 'red', marginLeft: 30 }}>{codeErrors[0]}</Text>

                    <View style={[CardStyle.containerImg, { justifyContent: 'center', marginTop: 10 }]}>

                        <TouchableOpacity onPress={() => setShowModalAdd(false)} style={[CardStyle.button, { backgroundColor: '#FF4040' }]}>
                            <Text style={{ color: '#fff' }}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSubmit} style={[CardStyle.button, { backgroundColor: '#3E8500', paddingHorizontal: 26 }]}>
                            <Text style={{ color: '#fff' }}>Añadir</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ModalHome>
        </View>
    )
}
export default AddCard 