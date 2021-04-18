import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Likes() {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center", //열 중앙
        justifyContent: "center", //행 중앙
      }}
    >
      <TouchableOpacity>
        <Text style={{ color: "white" }}>Likes</Text>
      </TouchableOpacity>
    </View>
  );
}
