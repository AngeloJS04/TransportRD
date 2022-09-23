import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Dimensions } from 'react-native'
import { Card } from 'react-native-elements'
import Skeleton from '../../components/app/skeleton'
import { ScrollView } from '../../components/screens/card/styles'
import CheckboxShedule from '../../components/screens/home/checkbox'
import { NewsPropsI } from '../../interface/home/home.interface'
import { CardsItems } from '../../settings/CardsNews.settings'
import { HomeStyles } from '../../theme/home.style'

const HomeScreen = () => {
    // const [active, setActive] = useState(true)
    const [isSelected, setSelection] = useState(false);
    const [showNews, setShowNews] = useState(true);
    const [showStations, SetshowStations] = useState(false);
    const [showSCableWay, SetshowSCableWay] = useState(false);
    const [newList, setNewList] = useState<NewsPropsI[]>([])
    const [shedules, setShedules] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const cardWidth = Dimensions.get("window").width * 0.8;
    const skeWidth = cardWidth + 7;

    const getInfo = async () => {
        setLoading(true)

        const { data: news } = await axios('https://api-metro.onrender.com/opret-news')
        setNewList(news.newsList)

        const { data: shedule } = await axios('https://api-metro.onrender.com/schedule-trains')
        setShedules(shedule.schedulesMetro)

        setLoading(false)
    }

    useEffect(() => { getInfo() }, [])

    return (
        <View style={{ marginBottom: showNews ? 140 : 710 }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={HomeStyles.titleDate}>
                    Informaciones Generales
                </Text>
            </View>

            {newList.length && !isSelected ? !showStations ? !showSCableWay ?
                <CheckboxShedule
                    isSelected={showNews}
                    titleShow={`Ver Noticias`}
                    titleHide={`Ocultar Noticias`}
                    setSelection={setShowNews}
                /> : null : null : null}

            <ScrollView >
                {loading && !newList.length ? (
                    [1, 2].map(i => (
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }} key={i}>
                            <View style={[HomeStyles.card, { width: cardWidth + 40 }]}>
                                {/* <Skeleton height={40} width={40} style={{ borderRadius: 20 }} /> */}
                                <Skeleton height={(skeWidth / 16) * 2} width={skeWidth} style={{ borderRadius: 1, marginTop: 4 }} />
                                <Skeleton height={20} width={70} style={{ borderRadius: 10, marginTop: 4 }} />
                                <Skeleton height={(skeWidth / 16) * 5} width={skeWidth} style={{ borderRadius: 1, marginTop: 4 }} />
                            </View>
                        </View>
                    ))
                ) : null}
                {
                    showNews && (
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
                                        <Card.Image
                                            style={{ padding: 50, borderRadius: 15, marginRight: 10, height: 30 }}
                                            source={{ uri: CardsItems[index] }} />
                                        <Text style={{ marginBottom: 0, flex: 1, fontSize: 14, fontWeight: '300' }}>
                                            {card.description}
                                        </Text>
                                    </View>
                                </Card>
                            </View>
                        ))
                    )
                }

            </ScrollView>

            {newList.length && shedules.length && !showNews ? !showStations ? !showSCableWay ? <CheckboxShedule
                isSelected={isSelected}
                titleShow={`Ver Horarios`}
                titleHide={`Ocultar Horarios`}
                setSelection={setSelection}
            /> : null : null : null}
            {
                isSelected &&
                <View style={HomeStyles.containerCenter}>

                    {shedules.length && shedules.length && shedules[0].map((h: string, i: number) => (

                        <View key={i} style={HomeStyles.containerSpecific}>
                            <View style={HomeStyles.containerDay} >
                                <Text style={HomeStyles.daySchedule}>{h}</Text>
                            </View>
                            {shedules[1].map((d: string, i: number) => {
                                if (i > 0) return;
                                return (
                                    <Text key={i} style={{ fontStyle: 'italic', marginVertical: 5, textAlign: 'center' }}>{d}</Text>
                                )
                            })}
                        </View>
                    ))}
                </View>
            }

            {newList.length && shedules.length && !showNews ? !isSelected ? !showSCableWay ? <CheckboxShedule
                isSelected={showStations}
                titleShow={`Ver Estaciones (Metro)`}
                titleHide={`Ocultar Estaciones`}
                setSelection={SetshowStations}
            /> : null : null : null}
            {showStations && (
                <View>
                    <Text>CENTRO DE LOS HEROES</Text>
                </View>
            )}


            {newList.length && shedules.length && !showNews ? !isSelected ? !showStations ? <CheckboxShedule
                isSelected={showSCableWay}
                titleShow={`Ver Estaciones (Teleferico)`}
                titleHide={`Ocultar Estaciones`}
                setSelection={SetshowSCableWay}
            /> : null : null : null}
            {showSCableWay && (
                <View>
                    <Text>Teleferico</Text>
                </View>
            )}
        </View >
    )
}
export default HomeScreen