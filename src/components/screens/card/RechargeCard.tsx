import React, { useState } from 'react'
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native'
import { Icon } from 'react-native-elements'
import ModalHome from '../../app/modal/modal'
import Card from './creditcard/card'
import Input from './creditcard/Input'
import { getBrand } from './creditcard/Input/brand'
// import CreditCard from 'react-native-credit-card';

// import IconUser from '../../../../assets/img/icon-user.svg'
// import IconCode from '../../../../assets/img/icon-code.svg'
// import IconDate from '../../../../assets/img/icon-date.svg'
// import IconNumber from '../../../../assets/img/icon-number.svg'
import { doc, updateDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../../../../fb'
import { editCards } from '../../../redux/slices/cards/cards'
import { RootState } from '../../../redux/store/store'
import { CardsI } from '../../../redux/types/card.type'
import { Button, Content, Header, ScrollView, Subtitle, TextButton, Title } from './styles'
const IconUser = '../../../../assets/img/icon-user.svg'

interface RechargeI {
    cardCode: string,
    RechargeModal: boolean,
    setRechargeModal: Function
}

const RechargeCard = ({ cardCode, setRechargeModal, RechargeModal }: RechargeI) => {

    const [widthAnimated, setWidthAnimated] = useState(new Animated.Value(310))
    const [backView, setBackView] = useState(false)
    const [feed, setFeed] = useState('')
    const dispatch = useDispatch();
    const cards = useSelector((state: RootState) => state.cards.cards)

    const [icon, setIcon] = useState({ icon: false })

    const [data, setData] = useState({
        name: '',
        number: '',
        validate: '',
        cvv: ''
    })


    const animatedCard = (back: boolean) => {
        if (back && !backView) {
            Animated.timing(widthAnimated, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
            }).start()

            setTimeout(() => {
                Animated.timing(widthAnimated, {
                    toValue: 310,
                    duration: 400,
                    useNativeDriver: false
                }).start()
                setBackView(true)
            }, 400)
        }
    }
    const handleSubmit = async () => {

        const foundCard: any = cards.find(((card: CardsI) => card?.id === cardCode))
        const newAmount = +foundCard.amount + +feed
        const { uid } = foundCard
        const docRef = doc(db, 'globalCards', uid)

        await updateDoc(docRef, { amount: newAmount })

        dispatch(editCards({ ...foundCard, amount: newAmount }))

        setRechargeModal(false)

    }

    return (

        <View >
            <ModalHome active={RechargeModal} setActive={setRechargeModal} close={true}>
                <ScrollView>
                    <Content>
                        <Header>
                            <Title>Metodo de pago</Title>
                            <Subtitle>Recarga tu tarjeta</Subtitle>
                            <View style={{ marginTop: 15 }}>
                                <Text style={{ marginLeft: 10 }}>TARJETA ID:</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: '#cccccc20' }]}
                                    editable={false} selectTextOnFocus={false}
                                    value={cardCode.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()}
                                />

                            </View>
                        </Header>
                        <Animated.View style={{ width: widthAnimated }}>
                            <Card data={data} icon={icon?.icon} back={backView} />
                        </Animated.View>

                        <Text style={{ marginLeft: 0 }}>Monto: (RD$20 = 1 VIAJE)</Text>
                        <Input
                            placeholder='Monto'
                            value={feed}
                            keyboardType="numeric"
                            maxLength={3}
                            onChangeText={(text) => { setFeed(text) }}
                            icon={<Icon
                                type='material-community'
                                name={'cash-multiple'}
                                size={22}
                                color={'#ccc'}
                                tvParallaxProperties={undefined} />
                            }
                        />

                        <Input
                            placeholder='Nombre del titular'
                            value={data.name}
                            onChangeText={(text) => {
                                setData({ ...data, name: text })
                                animatedCard(false)
                            }}

                            icon={<Icon
                                type='material-community'
                                name={'account'}
                                size={22}
                                color={'#ccc'}
                                tvParallaxProperties={undefined} />
                            }
                        />

                        <Input
                            placeholder='Número de cuenta'
                            value={data.number}
                            type='credit-card'
                            mask
                            onChangeText={(text) => {
                                setData({ ...data, number: text })
                                setIcon(getBrand(text))
                                animatedCard(false)
                            }}
                            icon={<Icon
                                type='material-community'
                                name={'numeric'}
                                size={22}
                                color={'#ccc'}
                                tvParallaxProperties={undefined} />
                            } />

                        <View style={{ flexDirection: 'row' }}>
                            <Input
                                placeholder='Validade'
                                value={data.validate}
                                type='custom'
                                options={{
                                    mask: '99/99'
                                }}
                                mask
                                onChangeText={(text) => {
                                    setData({ ...data, validate: text })
                                    animatedCard(false)
                                }}
                                width='50%'
                                icon={<Icon
                                    type='material-community'
                                    name={'calendar-range'}
                                    size={22}
                                    color={'#ccc'}
                                    tvParallaxProperties={undefined} />
                                } />
                            <Input
                                placeholder='CVV'
                                value={data.cvv}
                                type='custom'
                                options={{
                                    mask: '9999'
                                }}
                                mask
                                onChangeText={(text) => {
                                    setData({ ...data, cvv: text })
                                    animatedCard(true)
                                }}
                                width='50%'
                                icon={<Icon
                                    type='material-community'
                                    name={'credit-card-chip'}
                                    size={22}
                                    color={'#ccc'}
                                    tvParallaxProperties={undefined} />
                                } />
                        </View>
                        <Button onPress={handleSubmit}>
                            <TextButton>Realizar compra</TextButton>
                        </Button>
                    </Content>


                </ScrollView>
            </ModalHome>

        </View>
    )

}


export const styles = StyleSheet.create({
    input: {
        height: 34,
        margin: 12,
        borderWidth: 0.3,
        padding: 10,
        borderRadius: 10,

    }
})

export default RechargeCard