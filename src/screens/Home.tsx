import React from 'react';
import {StyleSheet, View} from 'react-native';
import IconButton from "../components/IconButton";

const Home: React.FC = ({setPlay}) => {
    return (
        <View style={styles.container}>
            <IconButton name={"play"} onPress={() => setPlay(true)}/>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, .7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});
