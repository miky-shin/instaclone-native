import React from "react";
import { Text, View } from "react-native";
import { gql, useMutation } from "@apollo/client";


const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UN_FOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;



export default function Profile() {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",//열 중앙
        justifyContent: "center", //행 중앙
      }}
    >
      <Text style={{ color: "white" }}>Someones Profile</Text>
    </View>
  );
}
