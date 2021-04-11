import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
export default function Welcome({ navigation }) {
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() =>  navigation.navigate("Create Account")}>
        <View>
          <Text> Go to create Account </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  navigation.navigate("LogIn")}>
        <View>
          <Text> Go to LogIn </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
