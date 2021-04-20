import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import DissmissKeyboard from "../DismissKeyboard";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 30px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
`;

export default function AuthLayout({ children }) {
  return (
    <DissmissKeyboard>
      <Container>
        <KeyboardAvoidingView
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          behavior="padding"
          keyboardVerticalOffset={70}
          placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        >
          <Logo
            resizeMode="contain"
            source={require("../../assets/logo.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </DissmissKeyboard>
  );
}
