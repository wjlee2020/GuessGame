import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function Input(props) {
    return (
        <TextInput style={{ ...style.input, ...props.extraStyle }} {...props} />
    );
}

const style = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginBottom: 15,
    },
});
