import {Dimensions} from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;
const bottom = ((height - width) / 2.5);
const size = width / 11;
const playerX1 = Math.round(3 * size);
const playerX2 = Math.round(playerX1 + size);
const timeout = 100;
const speed = 4;
const shift = size / speed;
const createBase = height - bottom - 2*size;

const collision = [
    {platforms: "ob", obstacles: undefined},
    {platforms: undefined, obstacles: undefined},
    {platforms: "p1", obstacles: "o2"},
    {platforms: "o2", obstacles: undefined},
    {platforms: undefined, obstacles: undefined},
    {platforms: "p3", obstacles: "o4"},
    {platforms: "o4", obstacles: undefined},
    {platforms: undefined, obstacles: undefined},
    {platforms: "p5", obstacles: undefined}
]

export {width, bottom, size, timeout, shift, speed, playerX1, playerX2, height, createBase, collision}
