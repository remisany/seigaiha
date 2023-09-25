import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";

//import constants
import definition from "../constants/definition";

const Block: React.FC = ({removeBlock, id, clock, level, setAllBlocks}) => {
    const {size, width, shift} = definition()
    const {bottom} = level

    const [blockX, setBlockX] = useState(width)

    useEffect(() => {
        setBlockX(prevX => {
            const newX = prevX - shift

            if (newX + size < 0) {
                removeBlock(id)
            }

            return newX
        })
    }, [clock])

    return (
        <View
            style={[styles.obstacle, {height: size, width: size, left: blockX, bottom: bottom, backgroundColor: id.includes("p") ? "red" : "green"}]}
            onLayout={(event) => {
                const {x} = event.nativeEvent.layout
                setAllBlocks(prevBlocks => {
                    const index = prevBlocks.findIndex(block => block.id == id)
                    prevBlocks[index] = {...prevBlocks[index], x: Math.round(x)}
                    return prevBlocks
                })
            }}
        />
    )
}

export default Block;

const styles = StyleSheet.create({
    obstacle: {
        position: 'absolute',
        backgroundColor: 'red',
        borderWidth: 1,
    }
});
