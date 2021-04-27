import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList, Text, useWindowDimensions, View, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
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
  background-color: black;
  margin-top: 0px;
  flex: 1;
  padding: 3px 0px;
`;

const InputBar = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 17px;
`;

const Input = styled.TextInput`
  color: white;
  width: ${(props) => props.width / 1.4}px;
  padding: 13px 10px;
  border-radius: 25px;
  border-color: rgba(255, 255, 255, 0.3);
  border-width: 0.5px;
`;
const UserAvatar = styled.Image`
  margin-right: 20px;
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
    console.log("1", payload);
    setValue("payload", "");
    console.log("2", payload);

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
      }}
    >
      <Caption style={{ flex: 8 }}>
        <CommentsContainer>
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
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
            flex:2,
          }}
          behavior="padding"
          keyboardVerticalOffset={85}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        >
      <InputBar style={{ backgroundColor: "black", flex: 1 }}>
        <UserAvatar resizeMode="cover" source={{ uri: userData?.me?.avatar }} />
        <Input
          width={width}
          placeholderTextColor="grey"
          placeholder="Add a comment..."
          autoCapitalize="none"
          returnKeyLabel="done"
          returnKeyType="done"
          autoCorrect={false}
          onChangeText={(text) => setValue("payload", text)}
          onSubmitEditing={handleSubmit(onValid)}
          clearTextOnFocus={true}
          clearButtonMode="always"
        />
      </InputBar>
      </KeyboardAvoidingView>
    </View>
  );
}
