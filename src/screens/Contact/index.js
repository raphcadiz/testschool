// @flow
import React, { Component } from "react";
import {
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  View as RNView,
  Linking,
  WebView
} from "react-native";
import { connect } from "react-redux";
import IconI from "react-native-vector-icons/Ionicons";
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View,
  Spinner,
} from "native-base";
import * as Font from 'expo-font'

import { Grid, Col } from "react-native-easy-grid";
import Carousel from "react-native-carousel-view";
import FooterNavigation from "../../components/FooterNav/";

import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const headerLogo = require("../../../assets/header-logo.png");

class Contact extends Component {

  state = {
    fontLoaded: false
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Arial-Black': require('../../../assets/fonts/Arial-Black.ttf'),
    })

    this.setState({ fontLoaded: true });
  }
  render() {
    if (!this.state.fontLoaded) {
      return (<Text></Text>)
    }
    
    return (
      <Container>
        <SafeAreaView>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <Image source={headerLogo} style={styles.imageHeader} />
          </Right>
        </Header>
        </SafeAreaView>
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >
          <View>
            <View>
              <RNView>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.slide}
                >
                  <ImageBackground
                    style={styles.newsPoster}
                    source={require("./assets/banner.png")}
                  >
                    <View style={styles.swiperTextContent}>
                      <Text
                        numberOfLines={2}
                        style={[styles.newsPosterHeader, {fontFamily: 'Arial-Black'}]}
                      >
                        Contact Details
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </RNView>
            </View>

            <View
              style={{
                padding: 20, 
                alignItems: 'center',
                paddingBottom: 60
              }}
            >
              <Image source={require("./assets/map.jpg")} style={{
                resizeMode: "contain", 
                width: (deviceWidth - 40), 
                height: 215,
                marginBottom: 20
              }} />

              <Text style={styles.headerText}>Address</Text>
              <Text style={styles.contentText}>1 Test Street, Perth</Text>

              <Text style={[styles.headerText, {marginTop: 20}]}>Phone</Text>
              <Text style={styles.contentText}>1800 123 456</Text>
            </View>
            
          </View>
        </Content>

        <FooterNavigation />
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {};
}

const mapStateToProps = state => ({
  items: state.homeReducer.items,
  hasErrored: state.homeReducer.hasErrored,
  isLoading: state.homeReducer.isLoading
});
export default connect(
  mapStateToProps,
  bindAction
)(Contact);
