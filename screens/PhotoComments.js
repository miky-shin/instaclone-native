import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native"
import Comments from "../components/Comments";

export const SEE_PHOTO_COMMENTS = gql`
  query seePhotoComments($id: Int!) {
    seePhotoComments(id: $id) {
      id
      payload
      isMine
      createdAt
      user {
          id
          username
          avatar
      }
    }
  }
`;

const Caption = styled.View`
  flex-direction: row;
`;

export default function PhotoComments({route}) {
    const { data, loading, refetch, fetchMore } = useQuery(SEE_PHOTO_COMMENTS, {
        variables: {
          id: route?.params?.photoId,
        },
      });
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",//열 중앙

      }}
    >
        <Caption>
          <Comments
            route={{
              params: {
                photoId: route?.params?.photoId,
                comments: data?.seePhotoComments,
                isFeed: false,
              },
            }}
          ></Comments>
        </Caption>
      <Text style={{ color: "white" }}>Notifications</Text>
    </View>
  );
}
