import {Dimensions} from "react-native";

const definition = () => {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('screen').height
    const bottom = ((height - width) / 2.5)

    const size = width / 11

    const leftPlayer = 3*size
    const timeout = 100
    const speed = 4
    const shift = size / speed

    return {width, bottom, size, timeout, shift, speed, leftPlayer, height}
}

export default definition
