import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Feed" component={Feed} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Notifications" component={Notifications} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
}
