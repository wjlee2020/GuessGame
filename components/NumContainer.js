import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

export default function NumContainer({ children }) {
    return (
        <View style={style.container}>
            <Text style={style.number}>{children}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.accentColor,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    number: {
        color: Colors.accentColor,
    },
});
