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
import FooterNavigation from "../../components/FooterNav/";

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
                // onPress={() => this.props.navigation.navigate("Story")}
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
                      St. Mark's Primary School
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </RNView>
            </View>
            <View style={styles.containerGrid}>
              <Grid>
                {/* <Col style={styles.iconContainer}>
                  <TouchableOpacity
                    >
                    <Icon name="ios-home" size={160} style={{color: "#FFF", fontSize: 48}} />
                  </TouchableOpacity>
                </Col> */}
                <Col style={styles.iconContainer} >
                  <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Newsletter")}
                    >
                    <Icon name="ios-paper" size={160} style={{color: "#FFF", fontSize: 48, alignSelf: 'center'}} />
                    <Text style={{color: '#fff', fontSize: 13}}>Newsletter</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={styles.iconContainer}>
                  <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Calendar")}
                    >
                    <Icon name="ios-calendar" size={160} style={{color: "#FFF", fontSize: 48, alignSelf: 'center'}} />
                    <Text style={{color: '#fff', fontSize: 13}}>Calendar</Text>
                  </TouchableOpacity>
                </Col>
              </Grid>
              <Grid>
                <Col style={styles.iconContainer}>
                  <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Parents")}
                    >
                    <Icon name="ios-person" size={160} style={{color: "#FFF", fontSize: 48, alignSelf: 'center'}} />
                    <Text style={{color: '#fff', fontSize: 13}}>Parents</Text>
                  </TouchableOpacity>
                </Col>
                <Col style={styles.iconContainer}>
                  <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Contact")}
                    >
                    <Icon name="ios-call" size={160} style={{color: "#FFF", fontSize: 48, alignSelf: 'center'}} />
                    <Text style={{color: '#fff', fontSize: 13}}>Contact</Text>
                  </TouchableOpacity>
                </Col>
              </Grid>
              {/* <Grid>
                
                <Col style={{borderWidth: 15, borderColor: '#fff', padding: 25}}></Col>
              </Grid> */}
            </View>
          </View>
        </Content>

        <FooterNavigation />
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
