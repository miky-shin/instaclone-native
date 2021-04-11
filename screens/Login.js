import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
export default function LogIn({ navigation }) {
  return (
    <View>
      <Text>LogIn</Text>
      <TouchableOpacity onPress={() =>  navigation.navigate("Create Account")}>
        <View>
          <Text> Go to create Account </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
