import definition from "./definition";

const {size} = definition()

const levels = [
    {id: "0b", bottom: 0, probability: .1},
    {id: "1p", bottom: 2*size, probability: .9},
    {id: "2o", bottom: 3*size, probability: .2},
    {id: "3p", bottom: 5*size, probability: .5},
    {id: "4o", bottom: 6*size, probability: .1},
    {id: "5p", bottom: 8*size, probability: .2},
]

export default levels
