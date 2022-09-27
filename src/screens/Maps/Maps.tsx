import { GOOGLE_MAPS_KEY } from '@env';
import * as React from 'react';
import { Dimensions, PermissionsAndroid, Platform, StyleSheet, View, Animated } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import WelcomeModal from "../../components/app/welcomeModal";
import Geolocation from 'react-native-geolocation-service'
import { locationPermission } from '../../helpers/locationPermission';

const trainImg = require('../../../assets/img/train.png')


export default function MapsScreen() {
    const [active, setActive] = React.useState(true)
    const [dark, setDark] = React.useState(false);
    const [origin, setOrigin] = React.useState({ latitude: 18.451016257156976, longitude: -69.92772342401096 })
    const [destination, setDestination] = React.useState({ latitude: 18.455598753725006, longitude: -69.92401784582424 })


    const mapRef = React.createRef();


    // const getCurrentLocation = async () => {
    //     const locPermissionDenied = await locationPermission()
    //     console.log("LCOATION PERMISSION", locPermissionDenied)
    // }
    return (
        <View style={styles.container} >
            {active && (<WelcomeModal active={active} setActive={setActive} />)}
            <MapView
                // userLocationPriority={'balanced'}
                // mapType={'mutedStandard'}
                followsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                // showsTraffic={true}
                // toolbarEnabled={true}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={{
                    latitude: origin.latitude || 18.450349,
                    longitude: origin.longitude || -69.927622,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            // customMapStyle={dark ? mapStyle : null}
            >
                <Marker
                    // draggable
                    coordinate={origin}
                    image={trainImg}

                />
                <Marker

                    draggable
                    coordinate={destination}
                    onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}


                />
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_KEY}
                    strokeColor="black"
                    strokeWidth={6}
                />

                <Polyline
                    coordinates={[origin, destination]}
                    strokeColor={'blue'}
                    strokeWidth={4}
                />
            </MapView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        marginBottom: 90

    },
});

const mapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#212121",
            },
        ],
    },
    {
        elementType: "geometry.fill",
        stylers: [
            {
                saturation: -5,
            },
            {
                lightness: -5,
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#212121",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9E9E9E",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#BDBDBD",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "poi.business",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#181818",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1B1B1B",
            },
        ],
    },
    {
        featureType: "road",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#2C2C2C",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#8A8A8A",
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#373737",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#3C3C3C",
            },
        ],
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
            {
                color: "#4E4E4E",
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#616161",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#757575",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#000000",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#3D3D3D",
            },
        ],
    },
];
