import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { ScrollView } from '../../components/screens/card/styles'
import CheckboxShedule from '../../components/screens/home/checkbox'
import { NewsPropsI } from '../../interface/home/home.interface'
import { HomeStyles } from '../../theme/home.style'

const HomeScreen = () => {
    const [active, setActive] = useState(true)
    const [isSelected, setSelection] = useState(false);
    const [newList, setNewList] = useState<NewsPropsI[]>([])
    const [shedules, setShedules] = useState<any[]>([])

    const getNews = async () => {
        const { data: news } = await axios('https://api-metro.onrender.com/opret-news')
        setNewList(news.newsList)

        const { data: shedule } = await axios('https://api-metro.onrender.com/schedule-trains')
        setShedules(shedule.schedulesMetro)
    }


    useEffect(() => {
        getNews()
    }, [shedules.length])

    return (
        <View style={{ marginBottom: 254 }}>

            <View style={{ alignItems: 'center' }}>
                <Text style={HomeStyles.titleDate}>
                    {`Noticias del dia - ${new Date().toLocaleString().split(',')[0]}`}
                </Text>
            </View>

            {newList.length ? <CheckboxShedule isSelected={isSelected} setSelection={setSelection} /> : null}

            {
                isSelected &&
                <View style={HomeStyles.containerCenter}>
                    {shedules.length && shedules[0].map((h: string, i: number) => (
                        <View key={i}>
                            <View style={HomeStyles.containerDay} >
                                <Text style={HomeStyles.daySchedule}>{h}</Text>
                            </View>
                            {shedules[1].map((d: string, i: number) => {
                                if (i > 0) return;
                                return (
                                    <Text key={i} style={{ fontStyle: 'italic', marginVertical: 5 }}>{d}</Text>
                                )
                            })}
                        </View>
                    ))}
                </View>
            }

            <View >
                <ScrollView >
                    {
                        newList.map((card, index) => (
                            <View key={index}>
                                {/* @ts-ignore */}
                                <Card
                                    containerStyle={{ borderRadius: 15 }}
                                >
                                    <Card.Title style={HomeStyles.cardTitle}>{card.title}</Card.Title>
                                    <Text style={HomeStyles.cardText}>{card.date}</Text>
                                    <Card.Divider />
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        {/* @ts-ignore */}
                                        {/* <Card.Image
                                            style={{ padding: 70, borderRadius: 15, marginRight: 20, height: 30 }}
                                            source={{ uri: card.image }}
                                        /> */}
                                        {/* @ts-ignore */}
                                        <Text style={{ marginBottom: 0, flex: '1 auto', fontSize: 14, fontWeight: '300' }}>
                                            {card.description}
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
export default HomeScreen