import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import WelcomeModal from '../../components/app/welcomeModal'
import { ScrollView } from '../../components/screens/card/styles'

const HomeScreen = () => {
    const [active, setActive] = useState(true)


    return (
        <View>
            {active && (<WelcomeModal active={active} setActive={setActive} />)}


            <Text>Ultimas noticias</Text>

            <View>
                <ScrollView>

                    {/* @ts-ignore */}
                    <Card
                        containerStyle={{ borderRadius: 15 }}
                    >
                        <Card.Title>Nueva linea en los alcarrizos</Card.Title>
                        <Card.Divider />
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            {/* @ts-ignore */}
                            <Card.Image
                                style={{ padding: 70, borderRadius: 15, marginRight: 20, height: 30 }}
                                source={{ uri: 'https://diariolibre.blob.core.windows.net.optimalcdn.com/images/binrepository/metro-de-santo-domingo_15651189_20210127202704.jpg', }}
                            />
                            {/* @ts-ignore */}
                            <Text style={{ marginBottom: 0, flex: '1 auto', fontSize: 14, fontWeight: '300' }}>
                                The idea with React Native Elements is more about component
                            </Text>
                        </View>
                    </Card>

                </ScrollView>
            </View>


        </View >


    )
}

const styles = StyleSheet.create({
    containerModal: {
        justifyContent: 'center',
        alignItems: 'center'
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

})

export default HomeScreen