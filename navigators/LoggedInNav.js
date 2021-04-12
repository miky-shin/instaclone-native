import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";
import Feed from "../screens/Feed";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Feed" component={Feed} />
      <Tabs.Screen name="LogIn" component={LogIn} />
      <Tabs.Screen name="CreateAccount" component={CreateAccount} />
    </Tabs.Navigator>
  );
}
