import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import GameButton from "../components/GameButton";

import DefaultStyles from "../constants/default-styles";

export default function GameOverScreen({
    rounds,
    userNum,
    startNewGameHandler,
}) {
    return (
        <View style={style.container}>
            <Text style={DefaultStyles.title}>Game Over</Text>
            <View style={style.imageContainer}>
                <Image
                    fadeDuration={400}
                    style={style.image}
                    // source={require("../assets/adaptive-icon.png")}
                    source={{
                        uri: "https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1265&q=80",
                    }}
                    resizeMode="cover"
                />
            </View>
            <View style={DefaultStyles.basicContainer}>
                <Text style={DefaultStyles.bodyText}>
                    Rounds it took the phone to guess the number:
                </Text>
                <Text style={DefaultStyles.highLight}>{rounds}</Text>
            </View>
            <View style={DefaultStyles.basicContainer}>
                <Text style={DefaultStyles.bodyText}>
                    The Number to Guess was:
                </Text>
                <Text style={DefaultStyles.highLight}>{userNum}</Text>
            </View>
            <GameButton onPress={startNewGameHandler}>Restart</GameButton>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: 30,
    },
    image: {
        // need to set width /height on images from the outside
        width: "100%",
        height: "100%",
    },
});
