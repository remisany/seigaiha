import React from 'react';

//import components
import Level from "./Level";

//import constants
import levels from "../constants/levels";

const Levels: React.FC = ({setAllBlocks, clock, block, play}) => {
    return (
        levels.map((level, index) => (
            <Level
                key={index}
                level={level}
                block={block}
                clock={clock}
                setAllBlocks={setAllBlocks}
                play={play}
            />
        ))
    )
}

export default Levels
