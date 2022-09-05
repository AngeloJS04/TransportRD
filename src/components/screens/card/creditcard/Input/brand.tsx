import React from "react";

// import IconElo from '../../../../../../assets/img/icon-elo.svg'
// import IconMaster from '../../../../../../assets/img/icon-mastercard.svg'
// import IconVisa from '../../../../../../assets/img/icon-visa.svg'
// import IconHipercard from '../../../../../../assets/img/icon-hiper-card.svg'
import { Icon } from "react-native-elements";

interface propsBrand {
    [key: string]: any
}

const cardBrand: propsBrand = {
    '63': {
        icon: <Icon
            type='material-community'
            name={'account'}
            size={22}
            color={'#ccc'}
            tvParallaxProperties={undefined} />
    },
    '55': {
        icon: <Icon
            type='material-community'
            name={'account'}
            size={22}
            color={'#ccc'}
            tvParallaxProperties={undefined} />
    },
    '41': {
        icon: <Icon
            type='material-community'
            name={'account'}
            size={22}
            color={'#ccc'}
            tvParallaxProperties={undefined} />
    },
    '60': {
        icon: <Icon
            type='material-community'
            name={'account'}
            size={22}
            color={'#ccc'}
            tvParallaxProperties={undefined} />
    }
}

export const getBrand = (number: string) => {
    if (number && number.length >= 2) {
        const prefix = number.substring(0, 2)
        return cardBrand.hasOwnProperty(prefix) ? cardBrand[prefix] : false
    }

    return cardBrand['undefined']
}