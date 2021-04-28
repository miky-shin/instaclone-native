import React from "react"; 
import styled from "styled-components/native";
import useUser from "../hooks/useUser";
import { colors } from "../../colors";
import { useNavigation } from "@react-navigation/native";

const RoomContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 10px;
  background-color: black;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const RoomText = styled.Text`
  color: white;
`;
const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25.5px;
  margin-right: 20px;
  border-width: 0.1px;
  border-color: white;
`;
const Data = styled.View``;
const UnreadDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: ${colors.blue};
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  color: white;
  margin-top: 2px;
  font-weight: 500;
`;

export default function RoomItem({ users, unreadTotal, id }) {
  const { data: meData } = useUser();
  const navigation = useNavigation();
  const talkingTo = users.find(
    (user) => user.username !== meData?.me?.username
  );
  const goToRoom = () => navigation.navigate("Room", {
      id,
      talkingTo,
  })
  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: talkingTo?.avatar }} />
        <Data>
          <Username>{talkingTo?.username}</Username>
          <UnreadText>
            {unreadTotal} unread{" "}
            {unreadTotal === 1 ? "message" : "messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
}
