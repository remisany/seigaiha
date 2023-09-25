import AsyncStorage from '@react-native-async-storage/async-storage';

const set = async (key: string, value: string | number): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, value.toString())
    } catch (error) {
        console.log(`asyncStore set : ${error}`)
    }
}

const get = async (key: string): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (error) {
        console.log(`asyncStore get : ${error}`)
    }
}

export const asyncStore = {
    set: set,
    get: get
}
