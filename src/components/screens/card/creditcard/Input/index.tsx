import React, { ReactElement } from "react";

import { Container, TextInput, MaskTextInput } from './styles'

interface propsInput {
    width?: string
    icon: ReactElement | false
    placeholder: string
    mask?: boolean
    value: string
    type?: any
    keyboardType?: string
    options?: any
    maxLength?: number
    onChangeText: (text: string) => void
}

const Input: React.FC<propsInput> = ({
    width,
    icon,
    placeholder,
    mask,
    value,
    type,
    options,
    maxLength,
    keyboardType,
    onChangeText
}) => {
    return (
        <Container width={width}>
            {icon && icon}

            {mask
                ? <MaskTextInput value={value} type={type} options={options} onChangeText={(text: string) => onChangeText(text)} placeholder={placeholder} />
                : <TextInput value={value} keyboardType={keyboardType} maxLength={maxLength} placeholderTextColor={'#ccc'} onChangeText={(text: string) => onChangeText(text)} placeholder={placeholder} />
            }
        </Container>
    )
}

export default Input