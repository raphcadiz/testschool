// @flow
import React, { Component } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";

import { NavigationActions, StackActions } from "react-navigation";
import IconI from "react-native-vector-icons/Ionicons";

import {
  Container,
  Content,
  Text,
  Icon,
  ListItem,
  Thumbnail,
  View
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";

import styles from "./style";
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});
class SideBar extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground
          source={require("../../../assets/sidebar-transparent.png")}
          style={styles.background}
        >
          <Content style={styles.drawerContent}>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("School");
              }}
              iconLeft
              style={styles.links}
            >
              <IconI name="ios-home" size={30} style={styles.image}/>
              <Text style={styles.linkText}>Home</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Newsletter");
              }}
              iconLeft
              style={styles.links}
            >
              <IconI name="ios-paper" size={30} style={styles.image}/>
              <Text style={styles.linkText}>Newsletter</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => this.props.navigation.navigate("Calendar")}
              iconLeft
              style={styles.links}
            >
              <IconI name="ios-calendar" size={30} style={styles.image}/>
              <Text style={styles.linkText}>Calendar</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Parents");
              }}
              iconLeft
              style={styles.links}
            >
              <IconI name="ios-person" size={30} style={styles.image}/>
              <Text style={styles.linkText}>Parents</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {navigation.navigate("Contact")}}
              iconLeft
              style={styles.links}
            >
              <IconI name="ios-call" size={30} style={styles.image}/>
              <Text style={styles.linkText}>Contact</Text>
            </ListItem>
            {/* <ListItem
              button
              onPress={() => {
                navigation.navigate("Channels");
              }}
              iconLeft
              style={styles.links}
            >
              <IconI name="ios-keypad" size={30} style={styles.image}/>
              <Text style={styles.linkText}>CHANNELS</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Overview");
              }}
              iconLeft
              style={styles.links}
            >
              <Icon name="ios-stats" />
              <Text style={styles.linkText}> OVERVIEW</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Calendar");
              }}
              iconLeft
              style={styles.links}
            >
              <IconI name="ios-calendar" size={30} style={styles.image}/>
              <Text style={styles.linkText}>CALENDAR</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Timeline");
              }}
              iconLeft
              style={styles.links}
            >
              <IconI name="ios-timer" size={30} style={styles.image} />
              <Text style={styles.linkText}>TIMELINE</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Profile");
              }}
              iconLeft
              style={styles.links}
            >
              <IconI name="ios-person" size={30} style={styles.image} />
              <Text style={styles.linkText}> PROFILE</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Settings");
              }}
              iconLeft
              style={styles.links}
            >
              <IconI name="ios-settings" size={30} style={styles.image} />
              <Text style={styles.linkText}>SETTINGS</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => {
                navigation.navigate("Feedback");
              }}
              iconLeft
              style={styles.links}
            >
              <IconI name="ios-paper" size={30} style={styles.image} />
              <Text style={styles.linkText}>FEEDBACK</Text>
            </ListItem> */}
          </Content>
          {/* <View style={styles.logoutContainer}>
            <View style={styles.logoutbtn} foregroundColor={"white"}>
              <Grid>
                <Col>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.dispatch(resetAction);
                    }}
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent"
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      LOG OUT
                    </Text>
                    <Text note style={{ color: "#fff" }}>
                      Kumar Sanket
                    </Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => {
                      navigation.navigate("Profile");
                    }}
                  >
                    <Thumbnail
                      source={require("../../../assets/Contacts/sanket.png")}
                      style={styles.profilePic}
                    />
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View> */}
        </ImageBackground>
      </Container>
    );
  }
}

export default SideBar;
