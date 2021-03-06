// @flow
import React, { Component } from "react";
import { Platform, Dimensions, StatusBar, View } from "react-native";
import { Container, Content, Text, Button, Icon } from "native-base";
import Carousel from "react-native-carousel-view";
import IconI from "react-native-vector-icons/Ionicons";

import styles from "./styles";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class Walkthrough extends Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Content>
          <Carousel
            width={deviceWidth}
            height={deviceHeight}
            loop={false}
            indicatorAtBottom
            indicatorOffset={deviceHeight / 15}
            indicatorSize={Platform.OS === "android" ? 15 : 10}
            indicatorColor="#FFF"
            animate={false}
          >
            <View style={styles.slides}>
              <Text
                style={
                  Platform.OS === "android"
                    ? styles.apaginationText
                    : styles.iospaginationText
                }
              >
                {/* 1 of 3 */}
              </Text>
              <IconI name="md-paper" style={styles.imageIcons} />
              <Text
                numberOfLines={3}
                style={
                  Platform.OS === "android" ? styles.aText : styles.iosText
                }
              >
               Explore our latest school news from your mobile device
              </Text>
              <Button
                transparent
                rounded
                onPress={() => this.props.navigation.navigate("Drawer")}
                style={styles.Button}
              >
                <Text style={{ color: "#FFF", fontWeight: "600" }}>
                  Continue To App
                </Text>
              </Button>
            </View>

          </Carousel>
        </Content>
      </Container>
    );
  }
}

export default Walkthrough;
