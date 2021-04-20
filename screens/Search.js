import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import DissmissKeyboard from "../components/DismissKeyboard";

const Input = styled.TextInput``;

export default function Search({ navigation }) {
  const { setValue, register } = useForm();
  const SearchBox = () => (
    <TextInput
      style={{ backgroundColor: "white" }}
      placeholderTextColor="black"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword");
  }, []);
  return (
    <DissmissKeyboard>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center", //열 중앙
          justifyContent: "center", //행 중앙
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
          <Text style={{ color: "white" }}>Photo</Text>
        </TouchableOpacity>
      </View>
    </DissmissKeyboard>
  );
}
