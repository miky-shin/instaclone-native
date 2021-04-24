import React from "react";
import PropTypes from "prop-types";

import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import AuthLayout from "../components/auth/AuthLayout";
import { useNavigation } from "@react-navigation/native";

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
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function Comment({ id, photoId, user, payload, isMine }) {
  const navigation = useNavigation();
  const onDeleteClick = () => {};
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user?.username,
      id: user?.id,
    });
  };
  return (
    <CommentContainer>
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
      </Caption>

      {isMine ? (
        <DeletBtn onPress={onDeleteClick}>
          <Text>✖️</Text>
        </DeletBtn>
      ) : null}
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
