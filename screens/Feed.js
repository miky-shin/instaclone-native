import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  FlatList,
  Text,
  View,
} from "react-native";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../components/fragments";
import ScreenLayout from "../components/ScreenLayout";

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      user {
        username
        avatar
      }
      id
      file
      caption
      likes
      commentNumber
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
      isLiked
    }
  }
  ${COMMENT_FRAGMENT}
`;

export default function Feed() {
  const { data, loading } = useQuery(FEED_QUERY);
  const renderPhoto = ({ item: photo }) => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white" }}>{photo.caption}</Text>
      </View>
    );
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeFeed}
        keyExtractor={(comment) => "" + comment.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
