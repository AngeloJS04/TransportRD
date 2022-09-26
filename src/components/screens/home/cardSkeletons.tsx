import React from 'react'
import { Dimensions, View } from 'react-native'
import { HomeStyles } from '../../../theme/home.style';
import Skeleton from '../../app/skeleton'

const CardSkeletons = ({ i }: any) => {
    const cardWidth = Dimensions.get("window").width * 0.8;
    const skeWidth = cardWidth + 7;
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10, }}>
            <View style={[HomeStyles.card, { width: cardWidth + 40 }]}>

                <Skeleton height={(skeWidth / 16) * 2} width={skeWidth} style={{ borderRadius: 1, marginTop: 4 }} />
                <Skeleton height={10} width={70} style={{ borderRadius: 10, marginTop: 4 }} />
                <Skeleton height={(skeWidth / (i === 3 ? 50 : 20)) * 5} width={skeWidth} style={{ borderRadius: 1, marginTop: 4 }} />

            </View>
        </View>
    )
}

export default CardSkeletons