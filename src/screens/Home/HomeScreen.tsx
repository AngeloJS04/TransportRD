import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Pressable, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { ScrollView } from '../../components/screens/card/styles'
import CardSkeletons from '../../components/screens/home/cardSkeletons'
import CheckboxShedule from '../../components/screens/home/checkbox'
import { NewsPropsI } from '../../interface/home/home.interface'
import { CardsItems } from '../../settings/CardsNews.settings'
import { HomeStyles } from '../../theme/home.style'


const HomeScreen = () => {
    const [isSelected, setSelection] = useState(false);
    const [showNews, setShowNews] = useState(true);
    const [showStations, SetshowStations] = useState(false);
    const [loading, setLoading] = useState(false)
    const [showSCableWay, SetshowSCableWay] = useState(false);
    const [showStationLine, setshowStationLine] = useState(true)


    const [newList, setNewList] = useState<NewsPropsI[]>([])
    const [shedules, setShedules] = useState<any[]>([])
    const [stationsOne, setStationsOne] = useState([])
    const [stationsTwo, setStationsTwo] = useState([])
    const [infoStation, setInfoStation] = useState('')
    const [stationsCable, setStationsCable] = useState([])

    const getInfo = async () => {
        setLoading(true)
        const { data: news } = await axios('https://api-metro.onrender.com/opret-news')
        setNewList(news.newsList)

        const { data: shedule } = await axios('https://api-metro.onrender.com/schedule-trains')
        setShedules(shedule.schedulesMetro)

        const { data: stationsMetro } = await axios('https://api-metro.onrender.com/')
        setStationsOne(stationsMetro.stationOne)
        setStationsTwo(stationsMetro.stationTwo)

        const { data: stationsCables } = await axios('https://api-metro.onrender.com/station-cableway')
        setStationsCable(stationsCables.CableWay)

        setLoading(false)
    }
    const getInfoStations = async () => {
        const { data } = await axios(`https://api-metro.onrender.com/line-trains?line=${showStationLine ? 1 : 2}`)
        setInfoStation(data.Line)


    }
    useEffect(() => {
        getInfoStations()
    }, [showStationLine])

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
                {loading && !newList.length ? [1, 2, 3].map(i => (<CardSkeletons key={i} />)) : null}
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
                    {shedules.length && shedules[0].map((h: string, i: number) => (

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
                    <View >
                        <Pressable style={[HomeStyles.buttonsLine, { backgroundColor: showStationLine ? '#006CCC' : '#F52F03' }]} onPress={() => setshowStationLine(!showStationLine)}>
                            <Text style={{ color: '#fff' }}>
                                {`${showStationLine ? 'LINEA 1 (Pulsa para cambiar a Linea 2)' : 'LINEA 2 (Pulsa para cambiar a Linea 1)'}`}</Text>
                        </Pressable>

                        <ScrollView style={{ marginBottom: 400 }}>
                            {
                                showStationLine ?
                                    stationsOne.map((x, i) => (
                                        <Text style={{ padding: 3, marginLeft: 30, fontSize: 15, fontStyle: 'normal' }} key={i}>{`${i + 1} - ${x}`}</Text>
                                    ))
                                    :
                                    stationsTwo.length && stationsTwo.map((x, i) => (
                                        <Text style={{ padding: 3, marginLeft: 30, fontSize: 15 }} key={i}>{`${i + 1} - ${x}`}</Text>
                                    ))
                            }
                            {/* <View style={{ backgroundColor: showStationLine ? '#006CCC99' : '#F52F0399', width: 400, alignSelf: 'center', borderRadius: 10 }}>
                                <Text style={{ fontSize: 12, marginHorizontal: 15, color: '#fff', textAlign: 'center' }}>{infoStation}</Text>
                            </View> */}
                        </ScrollView>
                    </View>
                    <View>
                    </View>
                </View>
            )}
            {newList.length && shedules.length && !showNews ? !isSelected ? !showStations ? <CheckboxShedule
                isSelected={showSCableWay}
                titleShow={`Ver Estaciones (Teleferico)`}
                titleHide={`Ocultar Estaciones`}
                setSelection={SetshowSCableWay}
            /> : null : null : null}

            {
                showSCableWay && (
                    stationsCable.map((x, i) => (<Text style={{ padding: 3, marginLeft: 30, fontSize: 16, marginVertical: 5 }} key={i}>{`${i + 1} - ${x}`}</Text>))
                )
            }
        </View >
    )
}
export default HomeScreen