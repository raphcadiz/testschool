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
  Spinner
} from "native-base";

import { Grid, Col } from "react-native-easy-grid";
import Carousel from "react-native-carousel-view";

import { itemsFetchData } from "../../actions";
import datas from "./data.json";

import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const headerLogo = require("../../../assets/header-logo.png");

class Home extends Component {

  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      items: [],
      isFetching: true
    };
  }

  async componentDidMount() {
    let apiCall = await fetch('https://www.websitehostingperth.com.au/testschool/wp-json/wp/v2/posts');
    let data = await apiCall.json();

    var datu = []
    for (var i = 0; i < data.length; i++) {
      datu.push({
        id: data[i].id,
        title: data[i].title.rendered,
        link: data[i].link,
        modified: data[i].modified,
        status: data[i].status,
        excerpt: data[i].excerpt.rendered
      })
    }

    this.setState({
      items: datu,
      isFetching: false
    })
  }

  _stripShortCodeHtml = (text) => {
    var myReg = /\[.+\]/g;
    let nsdtext = text.replace(myReg, '');

    return nsdtext.replace(/<\/?[^>]+(>|$)/g, "");
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => this.props.navigation.navigate("Story")}
      >
        <View style={styles.newsContent}>
          <Text numberOfLines={2} style={styles.newsHeader}>
            {this._stripShortCodeHtml(item.excerpt)}
          </Text>
          <Grid style={styles.swiperContentBox}>
            <Col style={{ flexDirection: "row" }}>
              <Text style={styles.IIconInewsLink}>{item.title}</Text>
              <Icon name="ios-time" style={styles.timeIcon} />
              <Text style={styles.newsLink}>{item.modified}</Text>
            </Col>
            <Col>
              <TouchableOpacity
                style={styles.newsTypeView}
                onPress={() => this.props.navigation.navigate("Channel")}
              >
                <Text style={styles.newsTypeText}>{item.status}</Text>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
      </TouchableOpacity>
    );
  };

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
              <Carousel
                width={deviceWidth}
                height={330}
                indicatorAtBottom
                indicatorSize={Platform.OS === "android" ? 15 : 10}
                indicatorColor="#FFF"
                indicatorOffset={10}
                animate={false}
              >
                <RNView>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.props.navigation.navigate("Story")}
                    style={styles.slide}
                  >
                    <ImageBackground
                      style={styles.newsPoster}
                      source={require("../../../assets/NewsIcons/1.jpg")}
                    >
                      <View style={styles.swiperTextContent}>
                        <Text
                          numberOfLines={2}
                          style={styles.newsPosterHeader}
                        >
                          Flat App is a style of interface design emphasizing
                          minimal use of stylistic elements.
                        </Text>
                        <Grid style={styles.swiperContentBox}>
                          <Col style={{ flexDirection: "row" }}>
                            <Text style={styles.newsPosterLink}>
                              SPACE.com
                            </Text>
                            <IconI
                              name="ios-time"
                              style={styles.timePosterIcon}
                            />
                            <Text style={styles.newsPosterLink}>20m ago</Text>
                          </Col>
                          <Col>
                            <TouchableOpacity
                              style={styles.newsPosterTypeView}
                            >
                              <Text
                                style={styles.newsPosterTypeText}
                                onPress={() =>
                                  this.props.navigation.navigate("Channel")
                                }
                              >
                                SCIENCE
                              </Text>
                            </TouchableOpacity>
                          </Col>
                        </Grid>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </RNView>
                <RNView>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.props.navigation.navigate("Story")}
                    style={styles.slide}
                  >
                    <ImageBackground
                      style={styles.newsPoster}
                      source={require("../../../assets/NewsIcons/3.jpg")}
                    >
                      <View style={styles.swiperTextContent}>
                        <Text
                          numberOfLines={2}
                          style={styles.newsPosterHeader}
                        >
                          So that the applications are able to load faster and
                          resize easily.
                        </Text>
                        <Grid style={styles.swiperContentBox}>
                          <Col style={{ flexDirection: "row" }}>
                            <TouchableOpacity>
                            <Text style={styles.newsPosterLink}>CDC</Text>
                            </TouchableOpacity>
                            <IconI
                              name="ios-time"
                              style={styles.timePosterIcon}
                            />
                            <Text style={styles.newsPosterLink}>2hr ago</Text>
                          </Col>
                          <Col>
                            <TouchableOpacity
                              style={styles.newsPosterTypeView}
                            >
                              <Text
                                style={styles.newsPosterTypeText}
                                onPress={() =>
                                  this.props.navigation.navigate("Channel")
                                }
                              >
                                ENVIRONMENT
                              </Text>
                            </TouchableOpacity>
                          </Col>
                        </Grid>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </RNView>
                <RNView>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.props.navigation.navigate("Story")}
                    style={styles.slide}
                  >
                    <ImageBackground
                      style={styles.newsPoster}
                      source={require("../../../assets/NewsIcons/4.jpg")}
                    >
                      <View style={styles.swiperTextContent}>
                        <Text
                          numberOfLines={2}
                          style={styles.newsPosterHeader}
                        >
                          But still look sharp on high-definition screens.
                        </Text>
                        <Grid style={styles.swiperContentBox}>
                          <Col style={{ flexDirection: "row" }}>
                            <Text style={styles.newsPosterLink}>SKY.com</Text>
                            <IconI
                              name="ios-time"
                              style={styles.timePosterIcon}
                            />
                            <Text style={styles.newsPosterLink}>
                              1day ago
                            </Text>
                          </Col>
                          <Col>
                            <TouchableOpacity
                              style={styles.newsPosterTypeView}
                            >
                              <Text
                                style={styles.newsPosterTypeText}
                                onPress={() =>
                                  this.props.navigation.navigate("Channel")
                                }
                              >
                                WORLD
                              </Text>
                            </TouchableOpacity>
                          </Col>
                        </Grid>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </RNView>
              </Carousel>
            </View>
          </View>

          { (this.state.isFetching) ? (<Spinner />) : (<FlatList
            data={this.state.items}
            renderItem={this._renderItem}
            keyExtractor={item => item.id}
          />) }
          
        </Content>
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
)(Home);
