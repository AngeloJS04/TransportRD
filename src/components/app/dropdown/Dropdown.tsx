import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from 'react-native-elements';

const DropdownItem = ({ data, value, setValue }: any) => {

    // const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        if (!value) return;
        console.log(value)
    }, [value])


    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: '#008349' }]}>
                    Busca tu parada
                </Text>
            );
        }
        return null;
    };


    const renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <Icon
                        type='ionicon'
                        name={'bookmark-outline'}
                        size={20}
                        color={isFocus ? '#008349' : 'black'}
                        tvParallaxProperties={undefined} />
                )}
            </View>
        );
    };
    return (
        <View>

            <View style={styles.container}>
                {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#008349' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Encuentra tu parada' : ''}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item: any) => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (

                        <Icon
                            type='ionicon'
                            name={!isFocus ? 'search-outline' : "search-circle-outline"}
                            size={20}
                            color={isFocus ? '#008349' : 'black'}
                            tvParallaxProperties={undefined} />
                    )}
                    renderItem={renderItem}

                />
            </View>
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
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
});


export default DropdownItem