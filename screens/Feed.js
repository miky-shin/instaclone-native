import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COMMENT_FRAGMENT } from "../components/fragments";

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      commentNumber
      comments {
        ...CoomentFragment
      }
      createdAt
      isMine
      isLiked
    }
  }
  ${COMMENT_FRAGMENT}
`;


export default function Feed({navigation}) {

  const {data} = useQuery(FEED_QUERY);
  console.log(data);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",//열 중앙
        justifyContent: "center", //행 중앙
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text style={{ color: "white" }}>Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
