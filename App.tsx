import React, {useEffect} from 'react';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import * as NavigationBar from 'expo-navigation-bar';

//import screens
import Game from "./src/screens/Game";

const App: React.FC = () => {
    useEffect(() => {
        NavigationBar.setVisibilityAsync("hidden")

        NavigationBar.addVisibilityListener(({visibility}) => {
            visibility === "visible" && setTimeout(() => {
                NavigationBar.setVisibilityAsync("hidden")
            }, 3000)
        })
    }, [])


    return (
      <GestureHandlerRootView style={{flex: 1}}>
          <Game/>
      </GestureHandlerRootView>
  )
}

export default App
