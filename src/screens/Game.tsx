import React, {useEffect, useState} from 'react';

//import components
import Play from "./Play";
import Home from "./Home";

//import constants
import {timeout} from "../constants/definition";

const Game: React.FC = () => {
    const [clock, setClock] = useState<boolean>(false)
    const [start, setStart] = useState<boolean>(false)

    useEffect(() => {
        const clockInterval = start && setInterval(() => {
            setClock(prevClock => !prevClock)
        }, timeout)

        !start && clearInterval(clockInterval)

        return () => clearInterval(clockInterval)
    }, [start])

    return (
        <>
            <Play clock={clock} start={start} setStart={setStart}/>
            {!start && <Home setStart={setStart}/>}
        </>
    )
}

export default Game


//    //const [play, setPlay] = useState<boolean>(false)

//            {!play && <Home setPlay={setPlay} play={play}/>}
/*
    const [clock, setClock] = useState<boolean>(false)
    //const [play, setPlay] = useState<boolean>(false)

    useEffect(() => {
        const clockInterval = play && setInterval(() => {
            setClock(prevClock => !prevClock)
        }, timeout)

        !play && clearInterval(clockInterval)

        return () => {
            clearInterval(clockInterval)
        }
    }, [play])

 */
