import React from "react";
import {
  FlatList,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { PHOTO_FRAGMENT } from "../components/fragments";
import styled from "styled-components/native";
import FollowBtnFuc from "../components/FollowBtn";
import { colors } from "../colors";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      Photos {
        ...PhotoFragment
      }
      totalPhotos
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
  width: 100%;
`;
const Column = styled.View`
  align-items: center;
  padding: 0px 8px;
`;
const Info = styled.View`
  margin-left: 10px;
  margin-bottom: 15px;
  width: 100%;
`;
const Row = styled.View`
  margin-bottom: 20px;
  font-size: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 0px;
`;

const UserAvatar = styled.Image`
  margin-right: 35px;
  width: 90px;
  height: 90px;
  border-radius: 50px;
`;

const Username = styled.Text`
  font-weight: 600;
  color: white;
`;

const EditProfileBtn = styled.TouchableOpacity`
  background-color: black;
  border-radius: 3px;
  padding: 7px 7px;
  width: 100%;
  align-items: center;
  border: rgba(255, 255, 255, 0.4);
  font-weight: 600;
`;
const SuggestBtn = styled.TouchableOpacity`
  background-color: black;
  margin-right: 30px;
  border-radius: 3px;
  padding: 5px 7px;
  width: 30px;
  align-items: center;
  border: rgba(255, 255, 255, 0.4);
  font-weight: 600;
`;
const MessageBtn = styled.TouchableOpacity`
  background-color: black;
  margin-right: 5px;
  border-radius: 3px;
  padding: 5px 7px;
  width: 160px;
  align-items: center;
  border: rgba(255, 255, 255, 0.4);
  font-weight: 600;
`;
const MessageBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function Profile({ navigation, route }) {
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username: route?.params?.username,
    },
  });
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);

  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Photo", {
          photoId: photo.id,
        })
      }
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: width / numColumns }}
      />
    </TouchableOpacity>
  );

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
        <Row>
          <UserAvatar
            resizeMode="cover"
            source={{ uri: data?.seeProfile?.avatar }}
          />
          <Column>
            <Text
              style={{ color: "white", fontWeight: "600" }}
            >{`${data?.seeProfile?.totalPhotos} `}</Text>
            <Text style={{ color: "white" }}>Posts</Text>
          </Column>
          <Column>
            <Text
              style={{ color: "white", fontWeight: "600" }}
            >{`${data?.seeProfile?.totalFollowers} `}</Text>
            <Text style={{ color: "white" }}>followers</Text>
          </Column>
          <Column>
            <Text
              style={{ color: "white", fontWeight: "600", marginLeft: "9%" }}
            >{`${data?.seeProfile?.totalFollowing} `}</Text>
            <Text style={{ color: "white" }}>Following</Text>
          </Column>
        </Row>
        <Info>
          <Username>
            {data?.seeProfile?.firstName}
            {"  "}
            {data?.seeProfile?.lastName}
          </Username>
          <Text style={{ color: "white" }}>{data?.seeProfile?.bio}</Text>
        </Info>
        <Row>
          {!data?.seeProfile?.isMe ? (
            <Row>
              <FollowBtnFuc
                isFollowing={data?.seeProfile?.isFollowing}
                username={data?.seeProfile?.username}
                isProfile={true}
              />
              <MessageBtn>
                <MessageBtnText>Message</MessageBtnText>
              </MessageBtn>
              <SuggestBtn>
                <MessageBtnText>⌄</MessageBtnText>
              </SuggestBtn>
            </Row>
          ) : (
            <EditProfileBtn>
              <MessageBtnText>Edit Profile</MessageBtnText>
            </EditProfileBtn>
          )}
        </Row>
      </Header>

      <TouchableOpacity onPress={() => logUserOut(userData?.me?.username)}>
        <Text style={{ color: "white" }}>Log out</Text>
      </TouchableOpacity>

      <FlatList
        numColumns={numColumns}
        data={data?.seeProfile?.Photos}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderItem}
      />
    </View>
  );
}
