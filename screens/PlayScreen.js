import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    Dimensions,
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";

import { Ionicons } from "@expo/vector-icons";

import DefaultStyles from "../constants/default-styles";
import Card from "../components/Card";
import NumContainer from "../components/NumContainer";
import GameButton from "../components/GameButton";

function generateRandomBetween(min, max, exclude) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor(Math.random() * (max - min)) + min;

    if (randNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randNum;
    }
}

function renderedListItems(value, key) {
    return (
        <View style={style.list} key={key}>
            <Text>#{key}</Text>
            <Text>{value}</Text>
        </View>
    );
}

export default function PlayScreen({ userChoice, gameOverHandler }) {
    // locking screen to a certain orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initGuess);
    const [guessedNumsList, setGuessedNumsList] = useState([initGuess]);
    const [curLow, setCurLow] = useState(1);
    const [curHigh, setCurHigh] = useState(100);

    const [availableDeviceHeight, setavailableDeviceHeight] = useState(
        Dimensions.get("window").height
    );

    function guessAgainHandler(direction) {
        if (
            (direction === "lower" && currentGuess < userChoice) ||
            (direction === "greater" && currentGuess > userChoice)
        ) {
            Alert.alert("Don't lie!", "You know that this isn't a good hint", [
                { text: "Sorry", style: "cancel" },
            ]);
            return;
        }
        if (direction === "lower") {
            setCurHigh(currentGuess);
        } else if (direction === "greater") {
            setCurLow(currentGuess);
        }
        const nextNum = generateRandomBetween(curLow, curHigh, currentGuess);
        setCurrentGuess(nextNum);

        setGuessedNumsList((prev) => [nextNum, ...prev]);
    }

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", () => {
            setavailableDeviceHeight(Dimensions.get("window").height);
        });
    }, [Dimensions]);

    useEffect(() => {
        if (currentGuess === userChoice) {
            gameOverHandler(guessedNumsList.length);
        }
    }, [currentGuess, userChoice, gameOverHandler]);

    if (availableDeviceHeight < 500) {
        return (
            <View style={style.container}>
                <Text style={DefaultStyles.title}>Computer's Guess:</Text>
                <View style={style.controls}>
                    <GameButton onPress={guessAgainHandler.bind(this, "lower")}>
                        <Ionicons name="md-remove" size={20} color="white" />
                    </GameButton>

                    <NumContainer>{currentGuess}</NumContainer>

                    <GameButton
                        onPress={guessAgainHandler.bind(this, "greater")}
                    >
                        <Ionicons name="md-add" size={20} color="white" />
                    </GameButton>
                </View>
                <View style={style.listContainer}>
                    <ScrollView>
                        {guessedNumsList.map((guessedNum, i) =>
                            renderedListItems(
                                guessedNum,
                                guessedNumsList.length - i
                            )
                        )}
                    </ScrollView>
                </View>
            </View>
        );
    }

    return (
        <View style={style.container}>
            <Text style={DefaultStyles.title}>Computer's Guess:</Text>
            <NumContainer>{currentGuess}</NumContainer>
            <Card extraStyle={style.buttonContainer}>
                <GameButton onPress={guessAgainHandler.bind(this, "lower")}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </GameButton>

                <GameButton onPress={guessAgainHandler.bind(this, "greater")}>
                    <Ionicons name="md-add" size={24} color="white" />
                </GameButton>
            </Card>
            <View style={style.listContainer}>
                <ScrollView>
                    {guessedNumsList.map((guessedNum, i) =>
                        renderedListItems(
                            guessedNum,
                            guessedNumsList.length - i
                        )
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
        width: "80%",
        maxWidth: "90%",
        minWidth: 300,
        marginRight: "auto",
        marginLeft: "auto",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        alignItems: "center",
    },
    listContainer: {
        flex: 1,
        marginTop: 15,
        width: Dimensions.get("window").width > 350 ? "60%" : "80%",
    },
    list: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
