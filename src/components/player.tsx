import React, {useEffect, useRef} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import {State, TapGestureHandler} from "react-native-gesture-handler";

//import constants
import {size, height, shift, createBase, collision, playerX1, playerX2} from "../constants/definition";
import useDidMountEffect from "../customHooks/useDidMountEffect";

const Player: React.FC = ({allBlocks, clock, start, setStart}) => {
    const isJumping = useRef(false)
    const isFalling = useRef(false)
    const play = useRef(false)
    const count = useRef<number>(0)
    const level = useRef<number>(2)
    const player = useRef(createBase-2*size)
    const obstacles = useRef(new Map())
    const platforms = useRef(new Map())

    useDidMountEffect(() => {
        if (!start) {
            isJumping.current = false
            isFalling.current = false
            play.current = false
            count.current = 0
            level.current = 2
            player.current =  createBase-2*size
            obstacles.current.clear()
            platforms.current.clear()
        }
    }, [start])

    const updateRef = () => {
        if (level.current % 3 === 1) {
            obstacles.current.clear()
            platforms.current.clear()
            return
        }

        const typeCollision = collision[level.current]

        for (const [key, value] of allBlocks) {
            if (typeCollision.obstacles && key.includes(typeCollision.obstacles)) {
                obstacles.current.set(key, value)
            }

            if (typeCollision.platforms && key.includes(typeCollision.platforms)) {
                platforms.current.set(key, value)
            }
        }
    }

    const findResult = () => {
        if (!isFalling.current && !isJumping.current) {
            const y2 = player.current - size / 2

            for (const [_, block] of obstacles.current) {
                const blockX2 = block.x + size - shift

                if (playerX2 >= block.x + shift && playerX2 <= blockX2 && y2 >= block.y + shift && y2 <= block.y + size - shift) {
                    return 1
                }
            }
        }

        //Platform
        for (const [_, block] of platforms.current) {
            const blockX = Math.round(block.x)
            const blockX2 = Math.round(block.x + size - shift)

            if ((playerX1 >= blockX && playerX1 <= blockX2) || (playerX2 > blockX && playerX2 <= blockX2)) {
                return 2
            }
        }

        return undefined
    }


    useEffect(() => {
        if (isFalling.current && player.current > height) {
            setStart(false)
        }

        if(!isJumping.current) {
            updateRef()
            const result = findResult()

            if (!play.current && result) {
                play.current = true
            }

            if (play.current) {
                if (result && result === 1) {
                    console.log("STOP")
                }

                if (!result) {
                    isFalling.current = true
                    level.current = level.current === 0 ? 0 : level.current - 1
                    player.current = player.current + size
                } else {
                    isFalling.current = false
                }
            }
        } else {
            count.current = count.current + 1

            if (count.current === 2) {
                player.current = player.current + 2 * shift
                level.current = level.current + (level.current % 3 === 0 ? 2 : 1)
                isJumping.current = false
                count.current = 0
            }
        }

    }, [clock])

    const jumpAnimation = () => {
        isJumping.current = true
        player.current = player.current - ((level.current % 3 === 0 ? 2 : 1) * size + 2 * shift)
    }

    const singleTap = ({nativeEvent}) => nativeEvent.state === State.ACTIVE && !isJumping.current && play.current && !isFalling.current && jumpAnimation()

    const playerSize = {height: size, width: size, left: 3*size, bottom: height - size - player.current}

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
});


/*


        //console.log(typeCollision)

        //Obstacle
        /*if (!isFallingRef.current && !isJumpingRef.current) {
            for (const [id, block] of allBlocks[1]) {
                const blockX2 = block.x + size - shift
                const y2 = y - size / 2

                if (x2 >= block.x + shift && x2 <= blockX2 && y2 >= block.y + shift && y2 <= block.y + size - shift) {
                    return {type: 1, id: id}
                }
            }
        }*/

//Platform
/*for (const [id, block] of allBlocks[level.current]) {
    const blockX = Math.round(block.x)
    const blockX2 = Math.round(block.x + size - shift)

    if ((x >= blockX && x <= blockX2) || (x2 > blockX && x2 <= blockX2)) {
        return {type: 2, id: id, x: block.x}
    }
}*/

/*
    useDidMountEffect(() => {
        if (play) {
            setPlayerXY({x: leftPlayer, y: height - bottom - 4*size})
            setStart(false)
            isJumpingRef.current = false
            isFallingRef.current = false
        }
    }, [play])
 */

/*
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
    levelRef.current = levelRef.current === 0 ? 0 : levelRef.current - 1
    return {...prevPlayerXY, y: prevPlayerXY.y + size}
} else {
    isFallingRef.current = false
}

return prevPlayerXY
})
 */

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

/*
        //Obstacle
        if (!isFallingRef.current && !isJumpingRef.current) {
            for (const [id, block] of allBlocks[1]) {
                const blockX2 = block.x + size - shift
                const y2 = y - size / 2

                if (x2 >= block.x + shift && x2 <= blockX2 && y2 >= block.y + shift && y2 <= block.y + size - shift) {
                    return {type: 1, id: id}
                }
            }
        }

        //Platform
        for (const [id, block] of allBlocks[1]) {
            const blockX2 = block.x + size - shift

            if (block.y === y && (x >= block.x && x <= blockX2 || x2 > block.x && x2 <= blockX2)) {
                return {type: 2, id: id, x: block.x}
            }
        }
 */
