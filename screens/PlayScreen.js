import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
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
    const initGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initGuess);
    const [guessedNumsList, setGuessedNumsList] = useState([initGuess]);
    const [curLow, setCurLow] = useState(1);
    const [curHigh, setCurHigh] = useState(100);

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
        if (currentGuess === userChoice) {
            gameOverHandler(guessedNumsList.length);
        }
    }, [currentGuess, userChoice, gameOverHandler]);

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
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 20,
        width: 300,
        maxWidth: "80%",
        marginRight: "auto",
        marginLeft: "auto",
    },
    listContainer: {
        flex: 1,
        marginTop: 15,
        width: "50%",
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
