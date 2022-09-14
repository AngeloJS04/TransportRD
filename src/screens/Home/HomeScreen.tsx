import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import WelcomeModal from '../../components/app/welcomeModal'
import { ScrollView } from '../../components/screens/card/styles'
import { CardsItems } from '../../settings/CardsNews.settings'

const HomeScreen = () => {
    const [active, setActive] = useState(true)

    return (
        <View style={{ marginBottom: 140 }}>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ marginVertical: 20, fontSize: 22, fontStyle: 'italic' }}>{`Noticias del dia - ${new Date().toLocaleString().split(',')[0]}`}</Text>
            </View>

            <View >
                <ScrollView >
                    {
                        CardsItems.map((card, index) => (
                            <View key={index}>
                                {/* @ts-ignore */}
                                <Card
                                    containerStyle={{ borderRadius: 15 }}
                                >
                                    <Card.Title style={{ fontStyle: 'italic' }}>{card.title}</Card.Title>
                                    <Card.Divider />
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        {/* @ts-ignore */}
                                        <Card.Image
                                            style={{ padding: 70, borderRadius: 15, marginRight: 20, height: 30 }}
                                            source={{ uri: card.image }}
                                        />
                                        {/* @ts-ignore */}
                                        <Text style={{ marginBottom: 0, flex: '1 auto', fontSize: 14, fontWeight: '300' }}>
                                            {card.text}
                                        </Text>
                                    </View>
                                </Card>

                            </View>
                        ))
                    }
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