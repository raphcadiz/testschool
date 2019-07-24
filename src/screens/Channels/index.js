// @flow
import React, { PureComponent } from "react";
import { Image, SafeAreaView } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Tabs,
  Tab,
  Text,
  TabHeading
} from "native-base";

import styles from "./styles";

import TabOne from "./tabOne";
import TabTwo from "./tabTwo";
import TabThree from "./tabThree";

const headerLogo = require("../../../assets/header-logo.png");

class Channels extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Container>
        <SafeAreaView>
          <Header hasTabs>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon active name="menu" />
              </Button>
            </Left>
            <Body>
              <Image source={headerLogo} style={styles.imageHeader} />
            </Body>
            <Right />
          </Header>
        </SafeAreaView>
        <Tabs style={{ backgroundColor: "#fff" }}>
          <Tab
            heading={
              <TabHeading>
                <Text>Following</Text>
              </TabHeading>
            }
          >
            <TabOne navigation={this.props.navigation} />
          </Tab>
          <Tab heading="Popular">
            <TabTwo navigation={this.props.navigation} />
          </Tab>
          <Tab heading="Explore">
            <TabThree navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Channels;
