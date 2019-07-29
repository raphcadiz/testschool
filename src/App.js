// @flow
import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";

import Login from "./screens/Login/";
import ForgotPassword from "./screens/ForgotPassword";
import SignUp from "./screens/SignUp/";
import Walkthrough from "./screens/Walkthrough/";
import Comments from "./screens/Comments/";
import Channel from "./screens/Channel";
import Story from "./screens/Story";
import Home from "./screens/Home/";
import Channels from "./screens/Channels";
import Sidebar from "./screens/Sidebar";
import Overview from "./screens/Overview";
import Calendar from "./screens/Calendar/";
import Timeline from "./screens/Timeline";
import Feedback from "./screens/Feedback/";
import Profile from "./screens/Profile/";
import Settings from "./screens/Settings";
import School from "./screens/School";
import Contact from "./screens/Contact";
// import Parents from "./screens/Parents";
import Newsletter from "./screens/Newsletter";
import Post from "./screens/Post";
import Event from "./screens/Event";

const Drawer = createDrawerNavigator(
  {
    School: { screen: School },
    Home: { screen: Home },
    Channels: { screen: Channels },
    Overview: { screen: Overview },
    Calendar: { screen: Calendar },
    Timeline: { screen: Timeline },
    Feedback: { screen: Feedback },
    Profile: { screen: Profile },
    Settings: { screen: Settings },
    Contact: { screen: Contact },
    // Parents: { screen: Parents },
    Newsletter: { screen: Newsletter }
    // Post: { screen: Post }
  },
  {
    initialRouteName: "School",
    contentComponent: props => <Sidebar {...props} />
  }
);

const App = createStackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword },
    Walkthrough: { screen: Walkthrough },
    Story: { screen: Story },
    // Parents: { screen: Parents },
    Newsletter: { screen: Newsletter },
    Post: { screen: Post },
    Event: { screen: Event },
    Comments: { screen: Comments },
    Channel: { screen: Channel },
    Contact: { screen: Contact },
    Drawer: { screen: Drawer }
  },
  {
    index: 0,
    initialRouteName: "Walkthrough",
    headerMode: "none"
  }
);
const container = createAppContainer(App);
export default container;
