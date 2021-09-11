import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
} from "react-native";

import GameButton from "../components/GameButton";

import DefaultStyles from "../constants/default-styles";

export default function GameOverScreen({
    rounds,
    userNum,
    startNewGameHandler,
}) {
    return (
        <ScrollView>
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
                    <Text style={style.resText}>
                        Rounds it took the phone to guess the number:
                    </Text>
                    <Text style={DefaultStyles.highLight}>{rounds}</Text>
                    <Text style={style.resText}>The Number to Guess was:</Text>
                    <Text style={DefaultStyles.highLight}>{userNum}</Text>
                </View>
                <GameButton onPress={startNewGameHandler}>Restart</GameButton>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    imageContainer: {
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,
        borderRadius: Dimensions.get("window").width / 2,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: Dimensions.get("window").height / 20,
    },
    resText: {
        textAlign: "center",
        fontSize: Dimensions.get("window").height < 400 ? 14 : 18,
    },
    image: {
        // need to set width /height on images from the outside
        width: "100%",
        height: "100%",
    },
});
