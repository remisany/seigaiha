import React from 'react';
import {StyleSheet, View} from 'react-native';
import definition from "../constants/definition";

const Grid: React.FC = () => {
    const {size} = definition()

    const getCells = () => {
        const cells = []
        for (let i = 0; i < 121; i++) {
            cells.push(<View style={[{height: size, width: size}, styles.cell]}></View>)
        }
        return cells
    }

    return (
        <View style={styles.container}>
            {getCells().map((cell, index) => cell)}
        </View>
    )
}

export default Grid

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        bottom: 0
    },
    cell: {
        borderWidth: .5,
    }
});
