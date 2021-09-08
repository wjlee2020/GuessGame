import React, { useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";

import BeginGameScreen from "./screens/BeginGameScreen";
import PlayScreen from "./screens/PlayScreen";
import GameOverScreen from "./screens/GameOverScreen";

function fetchFonts() {
    return Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
}

export default function App() {
    const [userNum, setUserNum] = useState(undefined);
    const [rounds, setRounds] = useState(0);
    const [isDataLoading, setIsDataLoading] = useState(false);

    // load assets
    if (!isDataLoading) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setIsDataLoading(true)}
                onError={(e) => console.log(e)}
            />
        );
    }

    function startNewGameHandler() {
        setRounds(0);
        setUserNum(undefined);
    }

    function startGameHandler(selectedNum) {
        setUserNum(selectedNum);
        setRounds(0);
    }

    function gameOverHandler(numOfRounds) {
        setRounds(numOfRounds);
    }

    let content = <BeginGameScreen startGameHandler={startGameHandler} />;

    if (userNum && rounds <= 0) {
        content = (
            <PlayScreen
                userChoice={userNum}
                gameOverHandler={gameOverHandler}
            />
        );
    } else if (rounds > 0) {
        content = (
            <GameOverScreen
                rounds={rounds}
                userNum={userNum}
                startNewGameHandler={startNewGameHandler}
            />
        );
    }

    return (
        <View style={style.container}>
            <StatusBar style="auto" />
            <Header title="Welcome to GuessGame" />
            {content}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});
