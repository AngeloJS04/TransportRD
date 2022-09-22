import React from 'react'
import { View } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements'

const CheckboxShedule = ({ isSelected, setSelection }: any) => {
    return (
        <View>

            <CheckBox
                title={`${isSelected ? 'Ocultar horarios' : 'Ver horarios'}`}
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