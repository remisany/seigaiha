import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

//import components
import Player from "../components/player";
import Level from "../components/Level";

//import constants
import {width, bottom} from "../constants/definition";
import useDidMountEffect from "../customHooks/useDidMountEffect";

const Play: React.FC = ({clock, start, setStart}) => {
    const [allBlocks, setAllBlocks] = useState(new Map())

    useDidMountEffect(() => {
        !start && setAllBlocks(new Map())
    }, [start])

    return (
        <View style={{flex: 1}}>
            <View style={[{height: width, width: width, bottom: bottom}, styles.grid]}>
                {/*<Grid/>*/}
                <Level allBlocks={allBlocks} setAllBlocks={setAllBlocks} clock={clock}/>
            </View>

            <Player allBlocks={allBlocks} clock={clock} start={start} setStart={setStart}/>
        </View>
    )
}

export default Play

const styles = StyleSheet.create({
    grid: {
        position: "absolute",
    }
});
