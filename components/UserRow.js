import React from "react";
import { useNavigation } from "@react-navigation/native";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import { colors } from "../colors";
import useUser from "../components/hooks/useUser";

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

export default function UserRow({ avatar, username, isFollowing, isMe }) {
  const navigation = useNavigation();
  const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    //onCompleted: followUserCompleted,
  });
  const [unfollowUserMutation] = useMutation(UN_FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    //update: unfollowUserUpdate,
  });

  return (
    <Wrapper>
      <Column onPress={() => navigation.navigate("Profile", { username, id })}>
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn
          onPress={isFollowing ? unfollowUserMutation : followUserMutation}
        >
          <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
}
