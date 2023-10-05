import React, {useRef} from 'react';
import {Image, StyleSheet, View} from "react-native";

//import constants
import {size, createBase, shift, width, speed} from "../constants/definition";

//import hooks
import useDidMountEffect from "../customHooks/useDidMountEffect";

//import assets
import platform from "../assets/game/platform.png";

const Level: React.FC = ({clock, allBlocks, setAllBlocks}) => {
    const count = useRef<number>(0)

    useDidMountEffect(() => {
        count.current = count.current + 1

        const newAllBlocks = new Map(allBlocks)

        if (count.current === speed) {
            const probability = Math.random()

            if (probability < .9) {
                const newBlock = Date.now()
                newAllBlocks.set(newBlock+"p1", {x: width, y: Math.round(createBase - 2*size), bottom: 2*size})

                if (probability < .4) {
                    newAllBlocks.set(newBlock+"p3", {x: width, y: Math.round(createBase - 5*size), bottom: 5*size})

                    if (probability < .25) {
                        newAllBlocks.set(newBlock+"o2", {x: width, y: Math.round(createBase - 3*size), bottom: 3*size})
                    }

                    if (probability < .15) {
                        newAllBlocks.set(newBlock+"o4", {x: width, y: Math.round(createBase - 3*size), bottom: 3*size})
                    }

                    if (probability < .1) {
                        newAllBlocks.set(newBlock+"p5", {x: width, y: Math.round(createBase - 8*size), bottom: 8*size})
                    }
                }
            }

            count.current = 0
        }

        for (const [key, value] of newAllBlocks) {
            if (value.x < -size) {
                newAllBlocks.delete(key)
            } else {
                newAllBlocks.set(key, {...value, x: value.x - shift})
            }
        }

        setAllBlocks(newAllBlocks)
    }, [clock])

    return (
        Array.from(allBlocks.values()).map((block, index) => {
            const {x, bottom} = block

            return (
                <View key={index} style={[styles.obstacle, {height: size, width: size, left: x, bottom: bottom}]}>
                    <Image source={platform} style={styles.image} />
                </View>
            )
        })
    )
}

export default Level

const styles = StyleSheet.create({
    obstacle: {
        position: 'absolute',
        //backgroundColor: "red"
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    }
});

/*allBlocks.map(blocks => (
    Array.from(blocks.values()).map(block => {
        const {x, bottom} = block

        return (
            <View style={[styles.obstacle, {height: size, width: size, left: x, bottom: bottom}]}>
                <Image source={platform} style={styles.image} />
            </View>
        )
    })
))*/

/*
                if (newBlock.includes("o")) {
                    const newBlockInt = parseInt(newBlock.replace("o", ""))
                    const compatibility = prevAllBlocks.some(allBlock => {
                        const newBlockBottom = Math.round(height - bottom - (2*size + level.bottom) + size)
                        return Math.abs(parseInt(allBlock.id.replace("/[op]/g", "")) - newBlockInt) <= 2 && (bottom - size) && newBlockBottom === allBlock.y
                    })

                    if (!compatibility) {
                        return prevAllBlocks
                    }
                }

                setBlocks(prevBlock => [...prevBlock, newBlock])
                return [...prevAllBlocks, {id: newBlock, x: 0, y: Math.round(height - bottom - (2*size + level.bottom))}]
 */


/*
        //const create = random(probability)

        /*if (create) {
            const newBlock = Date.now()

            /*if (id.includes("o")) {
                for (const block of allBlocks.current) {
                    const newBlockBottom = Math.round(height - bottom - (2*size + level.bottom) + size)
                    if (Math.abs(block.id - newBlock) <= 2 && (bottom - size) && newBlockBottom === block.y) {
                        allBlocks.current.add({id: newBlock+id, x: 0, y: Math.round(height - bottom - (2*size + level.bottom))})
                        setBlocks(prevBlock => [...prevBlock, newBlock+id])
                    } else {
                        break
                    }
                }
            } else {

            allBlocks.current.set(newBlock+id, {x: 0, y: Math.round(height - bottom - (2*size + level.bottom))})
            setBlocks(prevBlock => [...prevBlock, newBlock+id])
        }*/
