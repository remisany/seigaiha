import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

//import components
import Player from "../components/player";
import Levels from "../components/Levels";
import Grid from "../components/Grid";

//import constants
import definition from "../constants/definition";

const Play: React.FC = ({clock, block, setPlay, play}) => {
    const [allBlocks, setAllBlocks] = useState([])

    const {width, bottom} = definition()

    return (
        <View style={{flex: 1}}>
            <View style={[{height: width, width: width, bottom: bottom}, styles.grid]}>
                <Grid/>
                <Levels setAllBlocks={setAllBlocks} clock={clock} block={block} play={play}/>
            </View>

            <Player allBlocks={allBlocks} clock={clock} setPlay={setPlay} play={play}/>
        </View>
    )
}

export default Play

const styles = StyleSheet.create({
    grid: {
        position: "absolute",
    }
});
