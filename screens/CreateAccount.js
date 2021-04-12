import { gql, useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { useEffect } from "react";
import { Keyboard } from "react-native";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const dismmissKeyboard = () => {
    Keyboard.dismiss();
  };
  const goToLogIn = () => navigation.navigate("LogIn");
  const onCompleted = (data) => {
    console.log(data);
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      goToLogIn();
    }
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const LastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onDone = () => {
    alert("done!");
  };

  const onValid = (data) => {
    if (!loading) {
      createAccount({
        variables: {
          ...data,
        },
      });
    }
  };
  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true });
    register("username", { required: true });
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        placeholder="Fisrt Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(LastNameRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        onChangeText={(text) => setValue("firstName", text)}
      />
      <TextInput
        ref={LastNameRef}
        placeholder="Last Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        onChangeText={(text) => setValue("lastName", text)}
      />
      <TextInput
        ref={usernameRef}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize={"none"}
        onSubmitEditing={() => onNext(emailRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={dismmissKeyboard}
        lastOne={true}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Create Account"
        disabled={
          !watch("firstName") ||
          !watch("lastName") ||
          !watch("username") ||
          !watch("email") ||
          !watch("password")
        }
        onPress={handleSubmit(onValid)}
      ></AuthButton>
    </AuthLayout>
  );
}
