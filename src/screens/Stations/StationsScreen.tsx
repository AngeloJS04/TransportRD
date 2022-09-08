
import React from 'react'
import { View, Text, Image } from 'react-native'

const stations = 'https://images.visitarepublicadominicana.org/mapa-metro-santo-domingo.jpg'

const StationsScreen = () => {
    return (
        <View>
            <Image source={{ uri: stations }} style={{ width: 400, height: 350, marginTop: 90, borderRadius: 10, marginRight: 230 }} />
        </View>
    )
}

export default StationsScreen