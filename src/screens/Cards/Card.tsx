import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, ButtonGroup, Card } from "react-native-elements";
import { useSelector } from "react-redux";
import AddCard from "../../components/screens/card/AddCard";
import RechargeCard from "../../components/screens/card/RechargeCard";
import { RootState } from "../../redux/store/store";
import { ImageSlices } from "../../settings/Images";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height

const CONTANER_WIDTH = width * 0.8
const SIDE_SPACE = (width - CONTANER_WIDTH) / 2.2;
const ALTURA_BACKDROP = height * 0.6;
const SPACE = 7



function BackDrop({ scrollX }: any) {

    return (
        <View style={[{ height: ALTURA_BACKDROP, width, position: "absolute", top: 0 }]}>

            {ImageSlices.map((imagen, index) => {
                const inputRange = [
                    (index - 1) * CONTANER_WIDTH,
                    index * CONTANER_WIDTH,
                    (index + 1) * CONTANER_WIDTH,
                ];

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 1, 0],
                });
                return (
                    <Animated.Image
                        key={index + 1}
                        blurRadius={3}
                        source={{ uri: imagen }}
                        style={[
                            { width: width, height: ALTURA_BACKDROP, opacity },
                            StyleSheet.absoluteFillObject,
                        ]}
                    />
                );
            })}
            <LinearGradient
                colors={["transparent", "#f1f1f1"]}
                style={{
                    width,
                    height: ALTURA_BACKDROP,
                    position: "absolute",
                    top: 0,
                    // opacity,
                }}
            />
        </View>
    )
}

const CardScreen = () => {

    const { me } = useSelector((state: RootState) => state.me)
    const cards = useSelector((state: RootState) => state.cards)


    const [showModalAdd, setShowModalAdd] = useState(false)
    const [RechargeModal, setRechargeModal] = useState(false)
    const [cardCode, setCardCode] = useState('')

    const Cards: any[] = [
        { amount: 120, code: '5636468368786121', status: true, uid: me.uid },
        { amount: 0, code: '1236718728386422', status: false, uid: me.uid },
        { amount: 130, code: '2435768718726135', status: true, uid: me.uid },
        { amount: 360, code: '8236785761786628', status: true, uid: me.uid }
    ]

    const scrollX = React.useRef(new Animated.Value(0)).current;


    const rechargeCard = (code: string) => {
        setRechargeModal(true)
        setCardCode(code);
    }

    return (
        <ScrollView>

            <SafeAreaView style={styles.container}>

                <StatusBar hidden />
                <BackDrop scrollX={scrollX} />

                <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', marginLeft: 230 }}>
                    {!showModalAdd && !RechargeModal && <Button title="Añadir tarjeta" buttonStyle={styles.appCard} onPress={() => setShowModalAdd(true)} />}
                    {showModalAdd && (<AddCard setShowModalAdd={setShowModalAdd} />)}
                    {RechargeModal && (<RechargeCard cardCode={cardCode} RechargeModal={RechargeModal} setRechargeModal={setRechargeModal} />)}
                </View>

                <Animated.FlatList
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    data={Cards || []}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ padding: 200, paddingHorizontal: SIDE_SPACE }}
                    decelerationRate={0}
                    snapToInterval={CONTANER_WIDTH}
                    scrollEventThrottle={16}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            (index - 1) * CONTANER_WIDTH,
                            index * CONTANER_WIDTH,
                            (index + 1) * CONTANER_WIDTH,
                        ];
                        const outputRange = [0, -50, 0]


                        const translateY = scrollX.interpolate({
                            inputRange,
                            outputRange
                        });

                        return (
                            //!collection
                            <View style={{ width: CONTANER_WIDTH }} key={index + 1}>
                                <Animated.View style={{
                                    marginHorizontal: SPACE,
                                    padding: SPACE,
                                    borderRadius: 34,
                                    backgroundColor: '#fff',
                                    alignItems: "center",
                                    transform: [{ translateY }],
                                }}>


                                    <Image source={require("../../../assets/img/card.jpg")} style={styles.posterImage} />
                                </Animated.View>
                                <View style={[styles.container, { marginTop: 4, marginLeft: 50, marginRight: 30 }]}>

                                    <Button title={"Recargar"} onPress={() => rechargeCard(item.code)} buttonStyle={{ borderRadius: 50, backgroundColor: '#3E850099' }} />
                                    <Text style={{ fontSize: 24, marginVertical: 25, fontWeight: 'bold', fontStyle: 'italic' }} >Informacion de tarjeta</Text>
                                    <Text style={{ fontSize: 18 }}>SALDO DISPONIBLE:</Text>

                                    <Text style={{ fontSize: 11 }}>*(RD$20 = 1 VIAJE)*</Text>
                                    <Text style={{ fontSize: 22, marginTop: 10, fontWeight: 'bold', height: 30, color: '#000' }}>RD$ {item.amount}</Text>

                                    <Text style={{ marginVertical: 10 }}>STATUS :
                                        <Text style={{ color: item.status ? '#3E850099' : '#FF030390' }}>{item.status ? 'ACTIVA' : 'INACTIVA'}</Text>
                                    </Text>
                                    <Text style={{ marginVertical: 10, fontSize: 11 }}>ID TARJETA :
                                        {item.code.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()}
                                    </Text>

                                </View>
                            </View>
                        )
                    }}
                />
            </SafeAreaView>
        </ScrollView>
    )
}

export const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    posterImage: {
        width: '100%',
        height: CONTANER_WIDTH * 0.5,
        resizeMode: "cover",
        borderRadius: 24,
        margin: 0,
        marginBottom: 10
    },
    appCard: {
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10,
        backgroundColor: '#3E8500',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 30
    },

})

export default CardScreen