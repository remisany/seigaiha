import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import {State, TapGestureHandler} from "react-native-gesture-handler";

const Player: React.FC = () => {
    const [jumpMultiplier, setJumpMultiplier] = useState(1)
    const [isJumping, setIsJumping] = useState(false)

    const jumpValue = useRef(new Animated.Value(0)).current


    const doubleTapRef = useRef()

    const jumpAnimation = () => {
        setIsJumping(true)
        Animated.timing(jumpValue, {toValue: 1, duration: jumpMultiplier * 100, useNativeDriver: false}).start(() => {
            Animated.timing(jumpValue, {toValue: 0, duration: jumpMultiplier * 300, useNativeDriver: false}).start(() => {
                setJumpMultiplier(0)
                setIsJumping(false)
            })
        })
    }

    useEffect(() => {
        (jumpMultiplier > 0 && !isJumping) && jumpAnimation()
    }, [jumpMultiplier])

    const jumpHeight = jumpValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, jumpMultiplier * 60]
    });

    const singleTap = ({nativeEvent}) => nativeEvent.state === State.ACTIVE && setJumpMultiplier(1)

    const doubleTap = ({nativeEvent}) => nativeEvent.state === State.ACTIVE && setJumpMultiplier(2)

    return (
        <TapGestureHandler onHandlerStateChange={singleTap} waitFor={doubleTapRef}>
            <TapGestureHandler ref={doubleTapRef} onHandlerStateChange={doubleTap} numberOfTaps={2}>
                <View style={styles.container}>
                    <Animated.View style={[styles.player, {bottom: jumpHeight}]}></Animated.View>
                </View>
            </TapGestureHandler>
        </TapGestureHandler>
    )
}

export default Player

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    player: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: 'blue',
        left: "30%"
    },
});
