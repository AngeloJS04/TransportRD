import { Dimensions, StyleSheet } from "react-native";

export const MapsStyle = StyleSheet.create({

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

