import React from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components/native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import Comment from "./Comment";

const CommentsContainer = styled.View`
  margin-top: 0px;
`;
const CommentCount = styled.Text`
  opacity: 0.7;
  margin: 5px 0px;
  color: white;
`;

export default function Comments({
  photoId,
  author,
  authorId,
  caption,
  commentNumber,
  comments,
}) {
  const renderComment = ({ item: comment }) => {
    return <Comment {...comment} />;
  };
  return (
    <CommentsContainer>
      <CommentCount>
        {commentNumber === 1 ? " 1 comment" : `View all ${commentNumber} comments`}
      </CommentCount>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={comments}
        renderItem={renderComment}
        keyExtractor={(comment) => "" + comment.id}
      />
    </CommentsContainer>
  );
}

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      payload: PropTypes.string,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
    })
  ),
};
