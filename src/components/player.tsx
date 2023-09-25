import React, {useEffect, useRef, useState} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import {State, TapGestureHandler} from "react-native-gesture-handler";

//import constants
import definition from "../constants/definition";
import useDidMountEffect from "../customHooks/useDidMountEffect";

const Player: React.FC = ({allBlocks, clock, setPlay, play}) => {
    const isJumpingRef = useRef(false)
    const isFallingRef = useRef(false)
    const isDoubleJumpRef = useRef(false)

    const {size, bottom, leftPlayer, height, shift} = definition()

    const [start, setStart] = useState<boolean>(false)
    const [playerXY, setPlayerXY] = useState({x: leftPlayer, y: height - bottom - 4*size})

    const findResult = (prevPlayerXY) => {
        const x = Math.round(prevPlayerXY.x)
        const y = Math.round(prevPlayerXY.y)
        const x2 = x + size

        //Obstacle
        if (!isFallingRef.current && !isJumpingRef.current) {
            for (const block of allBlocks) {
                const blockX2 = block.x + size - shift
                const y2 = y - size / 2

                if (x2 >= block.x + shift && x2 <= blockX2 && y2 >= block.y + shift && y2 <= block.y + size - shift) {
                    return {type: 1, id: block.id}
                }
            }
        }

        //Platform
        for (const block of allBlocks) {
            const blockX2 = block.x + size - shift

            if (block.y === y && (x >= block.x && x <= blockX2 || x2 > block.x && x2 <= blockX2)) {
                return {type: 2, id: block.id}
            }
        }

        return undefined
    }

    useDidMountEffect(() => {
        if (play) {
            setPlayerXY({x: leftPlayer, y: height - bottom - 4*size})
            setStart(false)
            isJumpingRef.current = false
            isFallingRef.current = false
        }
    }, [play])

    useEffect(() => {
        setPlayerXY(prevPlayerXY => {
            if (!start) {
                const result = findResult(prevPlayerXY)
                result && setStart(true)
                return prevPlayerXY
            }

            const result = findResult(prevPlayerXY)

            if (result && result.type === 1) {
                console.log("STOP")
            }

            isDoubleJumpRef.current = result && result.type === 2 && /[bo]/g.test(result.id)

            prevPlayerXY.y > height && setPlay(false)

            if (isJumpingRef.current) {
                if (result) {
                    isJumpingRef.current = false
                } else {
                    return { ...prevPlayerXY, y: prevPlayerXY.y + 2 * shift}
                }
            } else if (!result) {
                isFallingRef.current = true
                return {...prevPlayerXY, y: prevPlayerXY.y + size}
            } else {
                isFallingRef.current = false
            }

            return prevPlayerXY
        })
    }, [clock])

    const jumpAnimation = () => {
        isJumpingRef.current = true
        setPlayerXY(prevPlayer => ({...prevPlayer, y: prevPlayer.y - ((isDoubleJumpRef.current ? 2 : 1) * size + 2 * shift)}))
    }

    const singleTap = ({nativeEvent}) => nativeEvent.state === State.ACTIVE &&
        !isJumpingRef.current && start && !isFallingRef.current && jumpAnimation()

    const playerSize = {height: size, width: size, left: 3*size, bottom: height - size - playerXY.y}

    return (
        <TapGestureHandler onHandlerStateChange={singleTap}>
            <View style={{flex: 1}}>
                <Animated.View style={[styles.player, playerSize]}/>
            </View>
        </TapGestureHandler>
    )
}

export default Player

const styles = StyleSheet.create({
    player: {
        position: 'absolute',
        backgroundColor: 'blue',
    },

    /*
    setPlayerXY(prevPlayerXY => {
    const result = findResult(prevPlayerXY)

    if(start) {
        result && result.type === 1 && console.log("STOP")

        isDoubleJumpRef.current = result && result.type === 2 && /[bo]/g.test(result.id)

        prevPlayerXY.y > height && setPlay(false)

        if (isJumpingRef.current) {
            if (result) {
                isJumpingRef.current = false
            } else {
                return {...prevPlayerXY, y: prevPlayerXY.y + 2*shift}
            }
        } else {
            if (!result) {
                isFallingRef.current = true
                return {...prevPlayerXY, y: prevPlayerXY.y + size}
            } else {
                isFallingRef.current = false
            }
        }
    }

    if (result && !start) {
        setStart(true)
    }

    return prevPlayerXY
})
     */
});
