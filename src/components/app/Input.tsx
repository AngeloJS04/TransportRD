import React from "react";
import { TextInput, View, Text } from "react-native";
import { LoginStyle } from "../../theme/Login.style";


export function Input({ onChange, value, type }: any) {
    <View>
        <Text style={{ fontSize: 14, fontWeight: '400', color: '#000' }}>Email</Text>
        <TextInput onChangeText={(value) => onChange(value, type)} value={value} style={LoginStyle.input} placeholder="example@example.com" />
    </View>
}