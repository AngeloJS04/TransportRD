import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

const NotCard = () => {
    return (
        <View style={{ marginTop: 250, backgroundColor: '#fff', borderRadius: 25, padding: 20 }}>
            <Text style={{ fontSize: 25, fontStyle: 'italic', textAlign: 'center' }}> No tienes tarjetas disponibles!</Text>
            <Text style={{ textAlign: 'center', fontSize: 15, marginBottom: 10 }}>añade una en el boton superior derecho</Text>
            <Icon
                type='ionicon'
                name={'card-outline'}
                size={28}
                color={'green'}
                tvParallaxProperties={undefined} />
        </View>
    )
}

export default NotCard