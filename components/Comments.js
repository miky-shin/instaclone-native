import React from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components/native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Comment from "./Comment";



const CommentsContainer = styled.View`
  background-color: black;
  margin-top: 0px;
  flex: 1;
  padding: 3px 0px;
`;

export default function Comments({ route }) {
  const renderComment = ({ item: comment }) => {
    return <Comment {...comment} isFeed={route?.params?.isFeed} photoId={route?.params?.photoId}/>;
  };
  
  return (
    <CommentsContainer>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={route?.params?.comments}
        renderItem={renderComment}
        keyExtractor={(comment) => "" + comment.id}
      />
    </CommentsContainer>
  );
}
