import React from 'react';
import {StyleSheet, View} from 'react-native';

//import components
import Player from "../components/player";
import Obstacles from "../components/Obstacles";

const Play: React.FC = () => {
    return (
        <View style={styles.container}>
            <Player/>
            <Obstacles/>
        </View>
    )
}

export default Play

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    }
});
