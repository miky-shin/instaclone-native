import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require("./assets/logo.jpeg"),
      "https://www.google.com/search?rlz=1C5CHFA_enKR929KR929&sxsrf=ALeKk01Fm7zO8S2k5n-VHL398Ref37MT0w:1618126646155&source=univ&tbm=isch&q=%EA%B0%95%EC%95%84%EC%A7%80+png&sa=X&ved=2ahUKEwjk7ce_1_XvAhVaQd4KHZ6bAWgQ7Al6BAgEEBw&biw=720&bih=764&dpr=2#imgrc=C5nEUZsTfyMq-M",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
