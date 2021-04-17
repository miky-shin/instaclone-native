import React from "react";
import { Text, View } from "react-native";

export default function Me() {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",//열 중앙
        justifyContent: "center", //행 중앙
      }}
    >
      <Text style={{ color: "white" }}>Me</Text>
    </View>
  );
}
