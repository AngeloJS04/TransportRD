
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import DropdownItem from '../../components/app/dropdown/Dropdown';
// import { pageUrl } from '../../helpers/getURL';

const stationsOne = 'https://www.metrosantodomingo.com/bundles/MetroBundle/images/lineas-metro-santo-domingo/linea1-metro-santo-domingo.png'

const StationsScreen = () => {
    const [value, setValue] = useState(null);

    const data = [
        { label: 'Parada 1', value: '1' },
        { label: 'Parada 2', value: '2' },
        { label: 'Parada 3', value: '3' },
        { label: 'Parada 4', value: '4' },
        { label: 'Parada 5', value: '5' },
        { label: 'Parada 6', value: '6' },
        { label: 'Parada 7', value: '7' },
        { label: 'Parada 8', value: '8' },
    ];

    // useEffect(() => {
    //     console.log(pageUrl);
    // }, [])

    

    return (
        <View>
            <DropdownItem data={data} value={value} setValue={setValue} />

            <Image source={{ uri: stationsOne }} style={{ width: 260, height: 650, marginTop: 20, borderRadius: 10 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default StationsScreen