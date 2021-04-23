import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  gql,
  makeVar,
  useApolloClient,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import styled from "styled-components/native";
import { colors } from "../colors";
import useUser from "../components/hooks/useUser";
import FollowBtnFuc from "./FollowBtn";

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
`;
const Avatar = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const FollowBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  margin-right: 20px;
  border-radius: 3px;
  padding: 5px 7px;
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function UserRow({ id, avatar, username, isFollowing, isMe }) {
  const navigation = useNavigation();

  //console.log(username, isFollowingcache);

  const { data: userData } = useUser();
  const client = useApolloClient();

  return (
    <Wrapper>
      <Column onPress={() => navigation.navigate("Profile", { username, id })}>
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtnFuc isFollowing={isFollowing} username={username} />
      ) : null}
    </Wrapper>
  );
}
