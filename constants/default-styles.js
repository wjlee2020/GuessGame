import { Dimensions, StyleSheet } from "react-native";
import Colors from "../constants/colors";

export default StyleSheet.create({
    basicContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width * 0.7,
    },
    bodyText: {
        fontFamily: "open-sans",
        fontSize: 16,
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    highLight: {
        color: Colors.primaryColor,
        fontFamily: "open-sans-bold",
        marginBottom: 25,
    },
});
