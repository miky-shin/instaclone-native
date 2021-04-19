import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../apollo";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../components/fragments";
import useUser from "../components/hooks/useUser";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Header = styled.View`
  padding: 10px 10px;
  flex-direction: row;
  align-items: center;
  
`;
const Column = styled.View``;

const UserAvatar = styled.Image`
  margin-right: 40px;
  width: 90px;
  height: 90px;
  border-radius: 50px;
`;

const Username = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: white;
`;

export default function Me() {
  const { data: userData } = useUser();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username: userData?.me?.username,
    },
  });
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center", //열 중앙
        justifyContent: "center", //행 중앙
      }}
    >
      <Header>
        <UserAvatar
          resizeMode="cover"
          source={{ uri: data?.seeProfile?.avatar }}
        />
        <Column>
          <Username>{data?.seeProfile?.username}</Username>
          <Text
            style={{ color: "white" }}
          >{`${data?.seeProfile?.totalFollowers} followers`}</Text>
          <Text
            style={{ color: "white" }}
          >{`${data?.seeProfile?.totalFollowing} Following`}</Text>
          <Text style={{ color: "white" }}>
            {data?.seeProfile?.firstName}
            {"  "}
            {data?.seeProfile?.lastName}
          </Text>
          <Text style={{ color: "white" }}>{data?.seeProfile?.bio}</Text>
        </Column>
      </Header>

      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
