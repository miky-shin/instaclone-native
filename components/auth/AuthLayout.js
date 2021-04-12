import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
`;

export default function AuthLayout({ children }) {
  const dismmissKeyboard = () => {
    Keyboard.dismiss();
  }
  return (
    <TouchableWithoutFeedback style={{flex:1}} onPress={dismmissKeyboard}>
    <Container>
      <Logo resizeMode="contain" source={require("../../assets/logo.png")} />
      {children}
    </Container>
    </TouchableWithoutFeedback>
  );
}