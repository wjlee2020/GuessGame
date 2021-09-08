import React from "react";
import { View, StyleSheet } from "react-native";

export default function Card({ children, extraStyle }) {
    return <View style={{ ...style.card, ...extraStyle }}>{children}</View>;
}

const style = StyleSheet.create({
    card: {
        // shadow props for ios

        // shadowColor: "black",
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 6,
        // shadowOpacity: 0.3,

        // material design
        elevation: 5,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
    },
});
