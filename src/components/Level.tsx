import React, {useEffect, useState} from 'react';

//import constants
import {random} from "../constants/random";

//import components
import Block from "./Block";
import definition from "../constants/definition";
import useDidMountEffect from "../customHooks/useDidMountEffect";
import UseDidMountEffect from "../customHooks/useDidMountEffect";

const Level: React.FC = ({level, block, clock, setAllBlocks, play}) => {
    const [blocks, setBlocks] = useState([])

    const {probability, id} = level

    const {height, bottom, size} = definition()

    useDidMountEffect(() => {
        if (play) {
            setAllBlocks([])
            setBlocks([])
        }
    }, [play])

    useDidMountEffect(() => {
        const create = random(probability)

        if (create) {
            const newBlock = Date.now() + id

            setAllBlocks(prevAllBlocks => {
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
            })
        }
    }, [block])

    const removeBlock = id => {
        setBlocks(prevBlock => prevBlock.filter(block => block !== id))
        setAllBlocks(prevBlock => prevBlock.filter(block => block.id !== id))
    }

    return (
        blocks.map(block => (
            <Block key={block} id={block} removeBlock={removeBlock} clock={clock} level={level} setAllBlocks={setAllBlocks}/>
        ))
    )
}

export default Level
