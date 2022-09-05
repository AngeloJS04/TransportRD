import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native'
import ModalHome from '../../app/modal/modal'
import Card from './creditcard/card'
import Input from './creditcard/Input'
import { getBrand } from './creditcard/Input/brand'
import { Icon } from 'react-native-elements';
// import CreditCard from 'react-native-credit-card';

// import IconUser from '../../../../assets/img/icon-user.svg'
// import IconCode from '../../../../assets/img/icon-code.svg'
// import IconDate from '../../../../assets/img/icon-date.svg'
// import IconNumber from '../../../../assets/img/icon-number.svg'
import { ScrollView, Container, Header, Title, Subtitle, Content, Button, TextButton } from './styles'
const IconUser = '../../../../assets/img/icon-user.svg'

interface RechargeI {
    cardCode: string,
    RechargeModal: boolean,
    setRechargeModal: () => void
}

const RechargeCard = ({ cardCode, setRechargeModal, RechargeModal }: RechargeI) => {

    const [widthAnimated, setWidthAnimated] = useState(new Animated.Value(310))
    const [backView, setBackView] = useState(false)
    const [feed, setFeed] = useState('')
    const [icon, setIcon] = useState({
        icon: false
    })
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

                        <Text style={{ marginLeft: 10 }}>Monto: (RD$20 = 1 VIAJE)</Text>
                        <Input
                            placeholder='Monto'
                            value={feed}
                            type='credit-card'
                            mask
                            onChangeText={(text) => { setFeed(text) }}
                            icon={false}
                        // keyboardType='numeric'
                        // style={styles.input}
                        // maxLength={3}
                        // value={cardCode.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()}
                        />
                        <Input
                            placeholder='Nome do titular'
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
                            placeholder='Número do cartão'
                            value={data.number}
                            type='credit-card'
                            mask
                            onChangeText={(text) => {
                                setData({ ...data, number: text })
                                setIcon(getBrand(text))
                                animatedCard(false)
                            }}
                            icon={false} />

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
                                width='45%'
                                icon={false} />
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
                                width='45%'
                                icon={false} />
                        </View>
                        <Button onPress={() => console.log(data, feed)}>
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