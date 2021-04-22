import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PHOTO_FRAGMENT } from "../components/fragments";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      user {
        id
        username
        avatar
      }
      ...PhotoFragment
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`;


export default function PhotoScreen({ route }) {
  const { data, loading, refetch } = useQuery(SEE_PHOTO, {
    variables: {
      id: route?.params?.photoId,
    },
  });
  const [refreshing, setRefreshing] = useState();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{
          backgroundColor: "black",
          //justifyContent: "center", //행 중앙
        }}
        contentContainerStyle={
          {
            //backgroundColor: "black",
            //alignItems: "center", //열 중앙
            //justifyContent: "center",
          }
        }
      >
        <Photo {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  );
}
