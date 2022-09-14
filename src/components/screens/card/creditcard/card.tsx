import React, { ReactElement } from "react";
import { ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";

import { Container, Content, Strip, TextCVV, View, Text, ViewInformation } from './styles'

interface propsCard {
    data: {
        number: string
        name: string
        validate: string
        cvv: string
    }
    back: boolean
    icon: ReactElement | boolean
}

const Card: React.FC<propsCard> = ({ data, back, icon }) => {
    return (
        <Container>
            <Content>

                {back
                    ?
                    <Strip>
                        <TextCVV>{data.cvv}</TextCVV>
                    </Strip>
                    :
                    <ViewInformation>

                        <Icon
                            type='ionicon'
                            name={'hardware-chip'}
                            size={22}
                            color={'#ccc'}
                            tvParallaxProperties={undefined}
                        />
                        <View>

                            <Text bold fontSize='18px' >{data.number}</Text>
                            <Text bold fontSize='16px' >{data.name}</Text>
                            <Text fontSize='12px' >{data.validate}</Text>
                        </View>
                        {icon && icon}
                    </ViewInformation>
                }
            </Content>
        </Container>
    )
}

export default Card