import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FlatList,
  Text,
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
} from "react-native";
import styled, { withTheme } from "styled-components/native";
import { colors } from "../colors";
import Comment from "../components/Comment";
import Comments from "../components/Comments";
import { COMMENT_FRAGMENT } from "../components/fragments";
import useUser from "../components/hooks/useUser";

export const PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      user {
        id
        username
        avatar
      }
      id
      file
      caption
      likes
      commentNumber
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
      isLiked
    }
  }
  ${COMMENT_FRAGMENT}
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

const Caption = styled.View`
  flex-direction: row;
`;

const CommentsContainer = styled.View`
  margin-top: 0px;
  flex: 8;
  padding: 3px 0px;
`;

const InputBar = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 17px;
`;
const InputBorder = styled.View`
  border-radius: 25px;
  border-color: rgba(255, 255, 255, 0.3);
  border-width: 0.5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Input = styled.TextInput`
  color: white;
  width: ${(props) => props.width / 1.8}px;
  padding: 13px 10px;
`;

const InputBtn = styled.TouchableOpacity`
  padding: 14px 10px;
  border-radius: 3px;
  width: 20%;
`;

const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 25.5px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  border-width: 0.1px;
  border-color: white;
`;

export default function PhotoComments({ navigation, route }) {
  const [text, onChangeText] = useState("");
  const { data: userData } = useUser();
  const { width } = useWindowDimensions();

  const { data, loading, refetch, fetchMore } = useQuery(PHOTO_QUERY, {
    variables: {
      id: route?.params?.photoId,
    },
  });
  // const { data, loading, refetch, fetchMore } = useQuery(SEE_PHOTO_COMMENTS, {
  //   variables: {
  //     id: route?.params?.photoId,
  //   },
  // });

  const renderComment = ({ item: comment }) => {
    return (
      <Comment
        {...comment}
        isFeed={route?.params?.isFeed}
        photoId={route?.params?.photoId}
      />
    );
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const { register, handleSubmit, setValue, watch, getValues } = useForm();
  const createCommentUpdate = (cache, result) => {
    const { payload } = getValues();
    setValue("payload", "");

    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
        data: newComment,
      });
      cache.modify({
        id: `Photo:${route?.params?.photoId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [
    createCommentMutation,
    { loading: createloading },
  ] = useMutation(CREATE_COMMENT_MUTATION, { update: createCommentUpdate });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Comments",
    });
    register("payload", { required: true });
  }, []);
  const onValid = (data) => {
    onChangeText("");
    const { payload } = data;
    if (createloading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId: route?.params?.photoId,
        payload,
      },
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:"black",
      }}
    >
      <Caption style={{ flex: 8 }}>
        <CommentsContainer>
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={true}
            data={data?.seePhoto?.comments}
            renderItem={renderComment}
            keyExtractor={(comment) => "" + comment.id}
          />
        </CommentsContainer>
        </Caption>
      <KeyboardAvoidingView
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
        behavior="padding"
        keyboardVerticalOffset={85}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
      >
        <InputBar>
          <UserAvatar
            resizeMode="cover"
            source={{ uri: userData?.me?.avatar }}
          />
          <InputBorder>
            <Input
              value={text}
              width={width}
              placeholderTextColor="grey"
              placeholder="Add a comment..."
              autoCapitalize="none"
              returnKeyLabel="done"
              returnKeyType="done"
              autoCorrect={false}
              onChangeText={(text) => {
                setValue("payload", text);
                onChangeText(text);
              }}
              onSubmitEditing={handleSubmit(onValid)}
              // clearTextOnFocus={true}
              clearButtonMode="always"
              multiline={true}
              blurOnSubmit={true}
            ></Input>
            <InputBtn onPress={handleSubmit(onValid)}>
              <Text style={{ color: `${colors.blue}` }}>post</Text>
            </InputBtn>
          </InputBorder>
        </InputBar>
      </KeyboardAvoidingView>
    </View>
  );
}
