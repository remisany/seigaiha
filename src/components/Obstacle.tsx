import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

const Obstacle: React.FC = ({removeObstacle, id}) => {
    const width = Dimensions.get("screen").width
    const [obstacleX, setObstacleX] = useState(width)

    useEffect(() => {
        const obstacleMoveInterval = setInterval(() => {
            setObstacleX(prevX => {
                const newX = prevX - 2;

                if (newX + 20 < 0) {
                    clearInterval(obstacleMoveInterval);
                    removeObstacle(id);
                }

                return newX;
            })
        }, 5)

        return () => clearInterval(obstacleMoveInterval)
    }, [])

    return (
        <View style={[styles.obstacle, {left: obstacleX}]}/>
    )
}

export default Obstacle;

const styles = StyleSheet.create({
    obstacle: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: 'red',
        bottom: 0,
    },
});
