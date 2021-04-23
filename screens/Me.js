import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../apollo";
import useUser from "../components/hooks/useUser";
import Profile from "./Profile";

export default function Me({ navigation }) {
  const { data: userData } = useUser();
  useEffect(() => {
    navigation.setOptions({
      title: userData?.me?.username,
    });
  }, []);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center", //열 중앙
        justifyContent: "center", //행 중앙
      }}
    >
      <TouchableOpacity onPress={() => logUserOut(userData?.me?.username)}>
        <Text style={{ color: "white" }}>Log out</Text>
      </TouchableOpacity>

      <Profile
        navigation={navigation}
        route={{
          params: {
            username: userData?.me?.username,
            id: userData?.me?.id,
          },
        }}
      />
    </View>
  );
}
