import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";

//import screens
import Play from "./src/screens/Play";

const App: React.FC = () => {
  return (
      <GestureHandlerRootView  style={{flex: 1}}>
        <View style={styles.container}>
          <Play/>
        </View>
      </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
