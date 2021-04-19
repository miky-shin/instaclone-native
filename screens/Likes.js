import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { USER_FRAGMENT } from "../components/fragments";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default function Likes({ route }) {
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: {
      id: route?.params?.photoId,
    },
    skip: !route.params?.photoId,
  });

  const renderUser = ({ item: user }) => <UserRow {...user} />;

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={refresh}
        data={data?.seePhotoLikes}
        keyExtractor={(item) => item.username}
        renderItem={renderUser}
        style={{ width: "100%" }}
      />
    </ScreenLayout>
  );
}
