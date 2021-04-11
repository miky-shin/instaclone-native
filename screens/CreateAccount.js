import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";


export default function CreateAccount() {
  return (
    <AuthLayout>
      <AuthButton text="Create Account" disabled={true} onPress={null}></AuthButton>
    </AuthLayout>
  );
}
