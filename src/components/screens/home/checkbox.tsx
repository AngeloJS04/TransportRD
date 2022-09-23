import React from 'react'
import { View } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements'
import { HomeStyles } from '../../../theme/home.style'

interface CheckPropsI {
    isSelected: boolean
    setSelection: Function
    titleShow: string
    titleHide: string
}

const CheckboxShedule = ({ isSelected, setSelection, titleShow, titleHide }: CheckPropsI) => {
    return (
        <View >

            <CheckBox
                center
                containerStyle={HomeStyles.checkContainer}
                title={`${isSelected ? titleHide : titleShow}`}
                checkedIcon={<Icon
                    type='ionicon'
                    name={"lock-open-outline"}
                    size={24}
                    color={'#008349'}
                    tvParallaxProperties={undefined} />}

                uncheckedIcon={<Icon
                    type='ionicon'
                    name={'lock-closed-outline'}
                    size={24}
                    color={'#008349'}
                    tvParallaxProperties={undefined}
                />}
                checked={isSelected}
                onPress={() => { setSelection(!isSelected) }}
            />
        </View>
    )
}

export default CheckboxShedule