import React from 'react';
import {StyleSheet, Image, View} from "react-native";

//import constants
import {createBase, size} from "../constants/definition";

//import assets
import platform from "../assets/game/ppp.png"

const Block: React.FC = ({block}) => {
    const {x, y, bottom} = block

    return (
        <View style={[styles.obstacle, {height: size, width: size, left: x, bottom: bottom}]}>
            <Image source={platform} style={styles.image} />
        </View>
    )
}

export default Block;

const styles = StyleSheet.create({
    obstacle: {
        position: 'absolute',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    }
});

/*
            onLayout={(event) => {
                const {x} = event.nativeEvent.layout
                setAllBlocks(prevBlocks => {
                    const index = prevBlocks.findIndex(block => block.id == id)
                    prevBlocks[index] = {...prevBlocks[index], x: Math.round(x)}
                    return prevBlocks
                })
            }}
 */
