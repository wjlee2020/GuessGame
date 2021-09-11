import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumContainer from "../components/NumContainer";
import GameButton from "../components/GameButton";

import DefaultStyles from "../constants/default-styles";
import Colors from "../constants/colors";

export default function BeginGameScreen({ startGameHandler }) {
    const window = Dimensions.get("window");

    const [enteredNum, setEnteredNum] = useState("");
    const [gameNum, setGameNum] = useState("");
    const [error, setError] = useState("");
    const [confirmNum, setConfirmNum] = useState(false);

    const [btnWidth, setBtnWidth] = useState(window.width / 4);

    useEffect(() => {
        const subscription = Dimensions.addEventListener("change", () => {
            setBtnWidth(window.width / 4);
        });
    }, [window]);

    function numInputHandler(inputNum) {
        setEnteredNum(inputNum.replace(/[^0-9]/g, ""));
    }

    function resetInputHandler() {
        setEnteredNum("");
        setGameNum("");
        setConfirmNum(false);
    }

    function confirmInputHandler() {
        const chosenNum = parseInt(enteredNum);
        if (isNaN(chosenNum) || chosenNum < 1 || chosenNum > 99) {
            setError("Choose a number between 1-99");
            Alert.alert("Invalid", `Error: ${error}`, [
                {
                    text: "Okay",
                    style: "destructive",
                    onPress: resetInputHandler,
                },
            ]);
        } else {
            setConfirmNum(true);
            setGameNum(chosenNum);
            Keyboard.dismiss();
            setEnteredNum("");
        }
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={30}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={style.screen}>
                        <Text style={style.gameScreenTitle}>
                            Let's Start Playing
                        </Text>

                        <Card extraStyle={style.inputContainer}>
                            <Text style={DefaultStyles.bodyText}>
                                Select A Number
                            </Text>
                            <Input
                                extraStyle={style.input}
                                blurOnSubmit
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                placeholder="Enter a Number"
                                value={enteredNum}
                                onChangeText={(text) => numInputHandler(text)}
                            />

                            <View style={style.buttonContainer}>
                                <View style={{ width: btnWidth }}>
                                    <Button
                                        color={Colors.accentColor}
                                        title="Reset"
                                        onPress={resetInputHandler}
                                    />
                                </View>
                                <View style={{ width: btnWidth }}>
                                    <Button
                                        color={Colors.primaryColor}
                                        title="Confirm"
                                        onPress={confirmInputHandler}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmNum ? (
                            <Card extraStyle={style.gameNumContainer}>
                                <Text>Your Number</Text>
                                <NumContainer>{gameNum}</NumContainer>
                                <GameButton
                                    onPress={() => startGameHandler(gameNum)}
                                >
                                    Start Game
                                </GameButton>
                            </Card>
                        ) : null}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    gameScreenTitle: {
        fontSize: 20,
        marginVertical: 10,
        // for custom fonts, expo doesn't support fontWeight, need to use fontFamily
        fontFamily: "open-sans-bold",
    },
    inputContainer: {
        width: "80%",
        maxWidth: "90%",
        minWidth: 300,
        alignItems: "center",
    },

    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        marginRight: "auto",
        marginLeft: "auto",
        alignItems: "center",
        justifyContent: "space-between",
    },
    gameNumContainer: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: 100,
        textAlign: "center",
    },
    button: {
        // width: 100,
        marginRight: "auto",
        marginLeft: "auto",
    },
});
