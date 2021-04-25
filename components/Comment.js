import React from "react";
import PropTypes from "prop-types";

import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import AuthLayout from "./auth/AuthLayout";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.View`
  flex-direction: row;
`;
const CommentPayload = styled.Text`
  color: white;
`;
const DeletBtn = styled.TouchableOpacity`
  color: white;
`;
const Caption = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 5px;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 33px;
  height: 33px;
  border-radius: 25.5px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

export default function Comment({
  id,
  photoId,
  user,
  payload,
  isMine,
  isFeed,
}) {
  const navigation = useNavigation();

  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });

  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user?.username,
      id: user?.id,
    });
  };
  return (
    <CommentContainer>
      {isFeed ? null : (
        <TouchableOpacity onPress={goToProfile}>
          <UserAvatar resizeMode="cover" source={{ uri: user?.avatar }} />
        </TouchableOpacity>
      )}
      <Caption>
        <TouchableOpacity onPress={goToProfile}>
          <Username>{user?.username}</Username>
        </TouchableOpacity>
        <CaptionText>
          {payload?.split(" ").map((word, index) =>
            /#[\w]+/.test(word) ? (
              <React.Fragment key={index}>
                <Text style={{ color: "white" }}>{word} </Text>
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{word} </React.Fragment>
            )
          )}
        </CaptionText>
        {isMine ? (
          <DeletBtn onPress={onDeleteClick}>
            <Text>✖️</Text>
          </DeletBtn>
        ) : null}
      </Caption>
    </CommentContainer>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  payload: PropTypes.string,
  isMine: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
};
