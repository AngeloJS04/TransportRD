import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Card } from 'react-native-elements'
import { ScrollView } from '../../components/screens/card/styles'
import CheckboxShedule from '../../components/screens/home/checkbox'
import { NewsPropsI } from '../../interface/home/home.interface'
import { HomeStyles } from '../../theme/home.style'

const HomeScreen = () => {
    // const [active, setActive] = useState(true)
    const [isSelected, setSelection] = useState(false);
    const [showNews, setShowNews] = useState(false);
    const [showStations, SetshowStations] = useState(false);
    const [newList, setNewList] = useState<NewsPropsI[]>([])
    const [shedules, setShedules] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const getInfo = async () => {

        setLoading(true)
        const { data: news } = await axios('https://api-metro.onrender.com/opret-news')
        setNewList(news.newsList)

        setLoading(false)
        const { data: shedule } = await axios('https://api-metro.onrender.com/schedule-trains')
        setShedules(shedule.schedulesMetro)


    }

    useEffect(() => {
        // if (showNews) { setSelection(false) }
        getInfo()
    }, [])

    return (
        <View style={{ marginBottom: 270 }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={HomeStyles.titleDate}>
                    Informaciones Generales
                </Text>
            </View>

            {loading && (
                <View >
                    <ActivityIndicator
                        size={'large'}
                        color={'#4A9CD5'}
                        animating={true}

                    />
                </View>
            )}
            {newList.length && shedules.length && !isSelected ? !showStations ?
                <CheckboxShedule
                    isSelected={showNews}
                    titleShow={`Ver Noticias`}
                    titleHide={`Ocultar Noticias`}
                    setSelection={setShowNews}
                /> : null : null}

            <View>
                {
                    showNews && (
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
                    )
                }
            </View>

            {newList.length && shedules.length && !showNews ? !showStations ? <CheckboxShedule
                isSelected={isSelected}
                titleShow={`Ver Horarios`}
                titleHide={`Ocultar Horarios`}
                setSelection={setSelection}
            /> : null : null}
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

            {newList.length && shedules.length && !showNews ? !isSelected ? <CheckboxShedule
                isSelected={showStations}
                titleShow={`Ver Estaciones`}
                titleHide={`Ocultar Estaciones`}
                setSelection={SetshowStations}
            /> : null : null}
            {showStations && (
                <View>
                    <Text>CENTRO DE LOS HEROES</Text>
                </View>
            )}
        </View >
    )
}
export default HomeScreen