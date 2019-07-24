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
  View as RNView
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
  Footer,
  FooterTab
} from "native-base";

import { Grid, Col } from "react-native-easy-grid";
import Carousel from "react-native-carousel-view";

import { itemsFetchData } from "../../actions";
// import datas from "./data.json";

import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const headerLogo = require("../../../assets/header-logo.png");
const iconBig = require("./assets/icon-big.png");

class School extends Component {
  componentDidMount() {
    // this.props.fetchData(datas);
  }
  render() {
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
                onPress={() => this.props.navigation.navigate("Story")}
                style={styles.slide}
              >
                <ImageBackground
                  style={styles.newsPoster}
                  source={require("../../../assets/home.jpg")}
                >
                  <View style={styles.swiperTextContent}>
                    <Image source={iconBig} style={styles.iconBig} />
                    <Text
                      numberOfLines={2}
                      style={styles.newsPosterHeader}
                    >
                      St. Marks Primary School
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </RNView>
            </View>
            <View style={styles.containerGrid}>
              <Grid>
                <Col style={{ flexDirection: "row", padding: 10, backgroundColor: '#222e84', alignItems: 'center',  justifyContent: 'center' }} size={2}>
                  <TouchableOpacity
                    >
                    <Icon name="ios-home" size={160} style={{color: "#FFF"}} />
                  </TouchableOpacity>
                </Col>
                <Col style={{ flexDirection: "row", padding: 10, backgroundColor: '#222e84', alignItems: 'center',  justifyContent: 'center' }} size={2}>
                  <TouchableOpacity
                    >
                    <Icon name="ios-home" size={160} style={{color: "#FFF"}} />
                  </TouchableOpacity>
                </Col>
              </Grid>
            </View>
          </View>
        </Content>

        <Footer style={styles.tabStyle}>
          <FooterTab>

            <Button>
              <Icon name="call" size={45} style={{color: "#FFF"}} />
            </Button>
            <Button>
              <Icon name="mail" size={45} style={{color: "#FFF"}} />
            </Button>
            <Button>
              <Icon name="settings" size={45} style={{color: "#FFF"}} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchData: url => dispatch(itemsFetchData(url))
  };
}

const mapStateToProps = state => ({
  items: state.homeReducer.items,
  hasErrored: state.homeReducer.hasErrored,
  isLoading: state.homeReducer.isLoading
});
export default connect(
  mapStateToProps,
  bindAction
)(School);
