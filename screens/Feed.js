import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../components/fragments";
import Photo from "../components/Photo";
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
    return <Photo {...photo} />;
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(comment) => "" + comment.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
