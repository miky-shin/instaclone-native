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

const FollowBtn = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.isProfile ? "black" : `${colors.blue}`};
  margin-right: 5px;
  border-radius: 3px;
  padding: 5px 7px;
  margin-left: 30px;
  width: ${(props) => (props.isProfile ? "160px" : "85px")};
  align-items: center;
  border: ${(props) => (props.isProfile ? "rgba(255,255,255,0.4)" : null)};
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function FollowBtnFuc({ isFollowing, username, isProfile }) {
  const { data: userData } = useUser();
  const client = useApolloClient();
  const followUserCompleted = (data) => {
    const {
      followUser: { ok },
    } = data;

    if (!ok) {
      return;
    }
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        totalFollowers(prev) {
          return prev + 1;
        },
        isFollowing() {
          return true;
        },
      },
    });
    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev + 1;
        },
      },
    });
  };
  const unfollowUserUpdate = (cache, result) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        totalFollowers(prev) {
          return prev - 1;
        },
        isFollowing() {
          return false;
        },
      },
    });

    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev) {
          return prev - 1;
        },
      },
    });
  };
  const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    onCompleted: followUserCompleted,
  });
  const [unfollowUserMutation] = useMutation(UN_FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: unfollowUserUpdate,
  });
  if (isFollowing) {
    return (
      <FollowBtn onPress={unfollowUserMutation} isProfile={isProfile}>
        <FollowBtnText>{"Unfollow"}</FollowBtnText>
      </FollowBtn>
    );
  } else {
    return (
      <FollowBtn onPress={followUserMutation} isProfile={isProfile}>
        <FollowBtnText>{"Follow"}</FollowBtnText>
      </FollowBtn>
    );
  }
}
