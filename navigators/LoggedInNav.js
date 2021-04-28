import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PhotoComments from "../screens/PhotoComments";
import MessagesNav from "../navigators/MessagesNav";
import TabNav from "../navigators/TabNav";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator
      // mode="modal"
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
        options={{
          headerShown: false,
        }}
        component={TabNav}
      />
      <Stack.Screen name="PhotoComments" component={PhotoComments} />
      <Stack.Screen
        name="Messages"
        options={{
          headerShown: false,
        }}
        component={MessagesNav}
      />
    </Stack.Navigator>
  );
}
