import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PhotoComments from "../screens/PhotoComments";
import MessagesNav from "../navigators/MessagesNav";
import TabNav from "../navigators/TabNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator
      mode="modal"
      //headerMode="none"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255,255,255,0.3)",
          backgroundColor: "black",
        },
      }}
    >
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerBackImage: ({tintColor}) => (
            <Ionicons name="close" color={tintColor} size={28} />
          ),
        }}
        component={UploadForm}
      />
      <Stack.Screen
        name="PhotoComments"
        options={{ headerShown: false }}
        component={PhotoComments}
      />
      <Stack.Screen
        name="Messages"
        options={{ headerShown: false }}
        component={MessagesNav}
      />
    </Stack.Navigator>
  );
}
