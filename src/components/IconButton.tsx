import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {StyleSheet, TouchableOpacity} from "react-native";

const IconButton: React.FC = ({name, onPress, customStyle}) => {
    return (
        <TouchableOpacity style={[styles.container, customStyle]} onPress={onPress}>
            <Ionicons name={name} size={55}/>
        </TouchableOpacity>
    )
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: 100,
        width: 100,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
    }
})
