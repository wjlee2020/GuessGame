import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";

export default function Header({ title }) {
    return (
        <View style={style.header}>
            <Text style={style.headerTitle}>{title}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        padding: 36,
        backgroundColor: Colors.primaryColor,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        color: "white",
        fontSize: 18,
        fontFamily: "open-sans-bold",
    },
});
