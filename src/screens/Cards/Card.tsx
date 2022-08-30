import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Animated, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, View, Text, Alert, TextInput } from 'react-native';
import { Button, Card, Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { v4 as uuidv4 } from 'uuid';
import ModalHome from "../../components/app/modal/modal";
import AddCard from "../../components/screens/card/AddCard";


const images = [
    "https://revistaconstruir.com/wp-content/uploads/2021/01/metro-5ff4b2751b81c.jpg",
    "https://omsa.gob.do/media/k2/items/cache/b48f2c03bbd159814922841bfb3fe7d7_XL.jpg",
    "https://diariolibre.blob.core.windows.net.optimalcdn.com/images/binrepository/telerico-de-santo-domingo_11230891_20190207162543.jpg",
    "https://i.ytimg.com/vi/dh4QGeay2Kc/maxresdefault.jpg",

];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height

const CONTANER_WIDTH = width * 0.8
const SIDE_SPACE = (width - CONTANER_WIDTH) / 2.2;
const ALTURA_BACKDROP = height * 0.6;
const SPACE = 7

// console.log(uuidv4())
function BackDrop({ scrollX }: any) {

    return (
        <View style={[{ height: ALTURA_BACKDROP, width, position: "absolute", top: 0 }]}>
            {images.map((imagen, index) => {
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
    const [showModalAdd, setShowModalAdd] = useState(false)

    const Cards: any[] = [
        { amount: 120, code: '123', status: true, uid: me.uid },
        { amount: 0, code: '1231', status: false, uid: me.uid },
        { amount: 130, code: '134', status: true, uid: me.uid },
        { amount: 360, code: '13234', status: true, uid: me.uid }
    ]

    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <ScrollView>

            <SafeAreaView style={styles.container}>

                <StatusBar hidden />
                <BackDrop scrollX={scrollX} />

                <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', marginLeft: 230 }}>

                    {!showModalAdd && <Button title="Añadir tarjeta" buttonStyle={styles.appCard} onPress={() => setShowModalAdd(true)} />}
                    {showModalAdd && (<AddCard setShowModalAdd={setShowModalAdd} />)}

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
                                <View style={[styles.container, { marginTop: 40, marginLeft: 50, marginRight: 30 }]}>
                                    <Text style={{ fontSize: 24, marginVertical: 30, fontWeight: 'bold', fontStyle: 'italic' }} >Informacion de tarjeta</Text>
                                    <Text style={{ fontSize: 18 }}>SALDO DISPONIBLE:</Text>

                                    <Card containerStyle={{ borderRadius: 20, alignItems: 'center', backgroundColor: item.amount > 0 ? '#3E850099' : '#FF030390' }}>
                                        <Text style={{ fontSize: 22, fontWeight: 'bold', height: 30, color: '#fff' }}>{item.amount}</Text>
                                    </Card>

                                    <Text style={{ marginVertical: 10 }}>STATUS :
                                        <Text style={{ color: item.status ? '#3E850099' : '#FF030390' }}>{item.status ? 'ACTIVA' : 'INACTIVA'}</Text>
                                    </Text>
                                    <Text style={{ marginVertical: 10, fontSize: 11 }}>ID TARJETA :
                                        {item.code}
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