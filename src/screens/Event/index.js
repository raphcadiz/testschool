// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Image,
  TouchableOpacity,
  Platform,
  Slider,
  Dimensions,
  View as RNView,
  SafeAreaView,
  ImageBackground
} from "react-native";

import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Icon,
  Body,
  View,
  Left,
  Right
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import IconI from "react-native-vector-icons/Ionicons";

import Modal from "react-native-modalbox";
import Carousel from "react-native-carousel-view";

import styles from "./styles";
const placeholderImg = require("../../../assets/placeholder.jpg");
import FooterNavigation from "../../components/FooterNav/";
const headerLogo = require("../../../assets/header-logo.png");

const deviceWidth = Dimensions.get("window").width;
const primary = require("../../theme/variables/commonColor").brandPrimary;
import HTML from 'react-native-render-html';

var moment = require('moment');
require('twix');

type Props = {
  navigation: () => void
};

class Event extends Component {
  state = {
    animationType: "slideInDown",
    open: false,
    value: 0
  };
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      animationType: "slideInDown",
      open: false,
      value: 0
    };
  }

  modalO() {
    this.setState({ open: true });
  }

  modalX() {
    this.setState({ open: false });
  }

  render() {
    let d = Dimensions.get("window");
    const { height, width } = d;

    return (
      <Container>
        <SafeAreaView>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon active name="arrow-back" style={styles.headerIcons} />
            </Button>
          </Left>
          <Body>
            <Image source={headerLogo} style={styles.imageHeader} />
          </Body>
          <Right>
          </Right>
        </Header>
        </SafeAreaView>

        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff" }}
        >

          <View>
            <ImageBackground
              style={styles.newsPoster}
              source={ (this.props.item.featured_image) ? {uri: this.props.item.featured_image} : placeholderImg}
            >
              <View style={[styles.swiperTextContent, {width: deviceWidth}]}>
                <Text
                  numberOfLines={2}
                  style={styles.newsPosterHeader}
                >
                  {this.props.item.title}
                </Text>
                <Grid style={styles.swiperContentBox}>
                  <Col style={{ flexDirection: "row" }}>
                    <IconI
                      name="ios-time"
                      style={styles.timePosterIcon}
                    />
                    <Text style={styles.newsPosterLink}>
                      { moment(this.props.item.start_date).twix(this.props.item.end_date).format() }
                    </Text>
                  </Col>
                  <Col>
                    <TouchableOpacity
                      style={styles.newsPosterTypeView}
                    >
                      { (this.props.item.categories.length) ? (<Text style={styles.newsPosterTypeText}>{this.props.item.categories.join(', ')}</Text>) : (<Text style={styles.newsPosterTypeText}>General</Text>)}
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>
            </ImageBackground>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: "#fff" }}>

              <View style={{ padding: 20 }}>
                { (this.props.item.description) ? (<HTML html={this.props.item.description} imagesMaxWidth={(deviceWidth-40)} />) : (<Text></Text>) }
              </View>

              <View
                style={{ alignSelf: "center", marginTop: 20, marginBottom: 20 }}
              >
                <Button
                  transparent
                  iconRight
                  onPress={() => this.props.navigation.goBack()}
                  textStyle={{ color: "#222", fontWeight: "700" }}
                >
                  <Text>BACK TO EVENTS</Text>
                  <Icon name="ios-arrow-forward" style={styles.forwardBtn} />
                </Button>
              </View>
            </View>

          </View>
        </Content>

        <FooterNavigation />
      </Container>
    );
  }
}

function bindAction(dispatch) {return {}}

const mapStateToProps = state => ({
  item: state.calendarReducer.event_selected,
});

export default connect(
  mapStateToProps,
  bindAction
)(Event);
