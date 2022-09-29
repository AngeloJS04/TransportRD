// import { GOOGLE_MAPS_KEY } from '@env';
import * as React from 'react';
import { View } from "react-native";
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import WelcomeModal from "../../components/app/welcomeModal";
import { OriginI } from '../../interface/maps/maps.interface';
import { polygon } from '../../settings/PolygonCoordinates';
import { MapsStyle } from '../../theme/Maps.style';
import { styles } from '../Cards/Card';
import Constants from "expo-constants";

const trainImg = require('../../../assets/img/train.png')

export default function MapsScreen() {
    const [active, setActive] = React.useState(true)
    const [arraycoordinates, setArraycoordinates] = React.useState<OriginI[]>([])
    const [origin, setOrigin] = React.useState<OriginI>({ latitude: 18.451016257156976, longitude: -69.92772342401096 })
    const [destination, setDestination] = React.useState({ latitude: 18.455598753725006, longitude: -69.92401784582424 })

    const GOOGLE_MAPS_KEY = Constants!.manifest!.extra!.googleApiKey;

    let timer = setInterval(() => { });

    const markCoord = (number: number) => {
        if (!arraycoordinates[number]) return clearInterval(timer);
        setOrigin({
            latitude: arraycoordinates[number].latitude,
            longitude: arraycoordinates[number].longitude
        })
    }

    React.useEffect(() => {
        let number = 0;
        timer = setInterval(() => {
            markCoord(number);
            number++;
        }, 5000);
    }, [arraycoordinates.length])

    return (
        <View style={styles.container} >
            {active && (<WelcomeModal active={active} setActive={setActive} />)}

            <MapView
                // showsMyLocationButton={true}
                // mapType={'mutedStandard'}
                // showsTraffic={true}
                followsUserLocation={true}
                showsCompass={true}
                style={MapsStyle.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={{
                    latitude: origin.latitude || 18.450349,
                    longitude: origin.longitude || -69.927622,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Polygon strokeWidth={1} strokeColor={'blue'} coordinates={polygon} />
                <Marker coordinate={origin} image={trainImg} />

                {/* Station Two */}
                <Marker
                    draggable
                    coordinate={destination}
                    onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
                />
                <MapViewDirections
                    origin={{ latitude: 18.451016257156976, longitude: -69.92772342401096 }}
                    destination={destination}
                    apikey={GOOGLE_MAPS_KEY}
                    strokeColor="black"
                    strokeWidth={3}

                />
                {/* Station Thee */}
                <Marker
                    draggable
                    coordinate={{ latitude: 18.459700775808653, longitude: -69.91643221896945 }}
                    onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
                />
                <MapViewDirections
                    origin={{ latitude: 18.455598753725006, longitude: -69.92401784582424 }}
                    destination={{ latitude: 18.459700775808653, longitude: -69.91643221896945 }}
                    apikey={GOOGLE_MAPS_KEY}
                    strokeColor="black"
                    strokeWidth={3}
                    onReady={(ready) => { { setArraycoordinates(ready.coordinates) } }}
                />
                {/* <Polyline /> */}
            </MapView>
        </View>
    );
}

