import React, {useEffect, useState} from 'react';

//import components
import Home from "./Home";
import Play from "./Play";

//import constants
import definition from "../constants/definition";
import useDidMountEffect from "../customHooks/useDidMountEffect";

const Game: React.FC = () => {
    const [clock, setClock] = useState<boolean>(false)
    const [block, setBlock] = useState<boolean>(false)
    const [_, setCount] = useState<number>(0)
    const [play, setPlay] = useState<boolean>(false)

    const {timeout, speed} = definition()

    useEffect(() => {
        const clockInterval = play && setInterval(() => {
            setCount(prevCount => {
                setClock(prevClock => !prevClock)

                if (prevCount === speed - 1) {
                    setBlock(prevBlock => !prevBlock)
                    return 0
                }

                return prevCount + 1
            })
        }, timeout)

        !play && clearInterval(clockInterval)

        return () => {
            clearInterval(clockInterval)
        }
    }, [play])

    return (
        <>
            <Play clock={clock} block={block} setPlay={setPlay} play={play}/>
            {!play && <Home setPlay={setPlay} play={play}/>}
        </>
    )
}

export default Game
