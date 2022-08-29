import React from "react";
import { Image } from 'react-native';

interface ImageU {
    logo: any,
    styles: any
}

export function ImageLogos({ logo, styles }: ImageU) {
    return (
        <Image source={{ uri: logo }} style={styles} />
    )
}