import React, {useEffect, useState} from 'react';

//import components
//import Obstacle from "./Obstacle";

//import constants
import {random} from "../constants/randomNumber";
import {View} from "react-native";

const Obstacles: React.FC = () => {
    /*const [obstacles, setObstacles] = useState([]);

    useEffect(() => {
        const obstacleCreationInterval = setInterval(() => {

            setTimeout(() => {
                const newObstacle = Date.now()
                setObstacles(prevObstacles => (
                    prevObstacles.length < 3 ? [...prevObstacles, newObstacle] : prevObstacles
                ))
            }, randomNumber(850, 2000))

        }, 1000);

        return () => clearInterval(obstacleCreationInterval)
    }, [])

    const removeObstacle = (id) => {
        setObstacles(prevObstacles => prevObstacles.filter(obstacle => obstacle !== id))
    }*/

    return (
        <View></View>
        /*obstacles.map(obstacle => (
            <Obstacle key={obstacle} id={obstacle} removeObstacle={removeObstacle}/>
        ))*/
    )
}

export default Obstacles;
