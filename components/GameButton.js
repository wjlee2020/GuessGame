import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";

import Colors from "../constants/colors";

export default function GameButton({ children, onPress }) {
    return (
        <Pressable onPress={onPress}>
            <View style={style.button}>
                <Text style={style.buttonText}>{children}</Text>
            </View>
        </Pressable>
    );
}

const style = StyleSheet.create({
    button: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
    },
    buttonText: {
        color: "white",
        fontFamily: "open-sans-bold",
    },
});
