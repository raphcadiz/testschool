// @flow
import React, { Component } from "react";
import { 
  Image, 
  TouchableOpacity,
  SafeAreaView, 
  Alert, 
  View as RNView,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Right,
  Body,
  Button,
  Icon,
  View,
  Spinner
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
var moment = require('moment');
import IconI from "react-native-vector-icons/Ionicons";

import { selectPost } from "./actions";

import styles from "./styles";
const primary = require("../../theme/variables/commonColor").brandPrimary;
const placeholderImg = require("../../../assets/placeholder.jpg");
import FooterNavigation from "../../components/FooterNav/";
import * as Font from 'expo-font'

const headerLogo = require("../../../assets/header-logo.png");
type Props = {
  navigation: () => void,
  day: string
};
class Newsletter extends Component {
  state: {
    date: Object,
    fontLoaded: false,
    selected: string
  };

  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      date: new Date(),
      selected: "",
      posts: [],
      isFetching: false,
    };
  }

  async componentDidMount () {
    await Font.loadAsync({
      'Arial-Black': require('../../../assets/fonts/Arial-Black.ttf'),
    })

    this.setState({ fontLoaded: true });
    this.getData()
  }

  async getData() {
    if (this.state.isFetching) {
      return;
    }

    this.setState({isFetching: true})
    let apiCall = await fetch('https://www.websitehostingperth.com.au/testschool/wp-json/wp/v2/posts')
      .then(response => response.json())
      .then(responseJson => {

        let filtered_posts = this._filterPosts(responseJson)
      })
      .catch(error => {
        Alert.alert(
            'Error',
            'Something went wrong while fetching data. Try again later.',
            [
              { text: 'OK', onPress: () => console.log('understand') },
            ],
            { cancelable: false }
        );
        this.setState({isFetching: false})
      });

  }

  _filterPosts = async (posts) => {
    var f_posts = []
    for (var i = 0; i < posts.length; i++) {
      f_posts.push({
        id: posts[i].id,
        title: posts[i].title.rendered,
        date: posts[i].date,
        description: posts[i].post_meta.mobile_content,
        img_full: posts[i].post_meta.img_full,
        thumbnail: posts[i].post_meta.thumbnail,
        categories: posts[i].post_meta.categories
      })

    }

    await this.setState({
      posts: f_posts,
      isFetching: false
    })
    
  }


  _readPost = (item) => {
    this.props.selectPost(item)
    this.props.navigation.navigate("Post")
  }

  _renderPostsList = () => {

    let _this = this

    if (!this.state.posts.length) {
      return <View style={{ backgroundColor: "#fff" }}>
      <TouchableOpacity
          style={{ flexDirection: "row" }}
        >
          <View style={styles.newsContent}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
              <IconI name="ios-calendar" />
              <Text numberOfLines={2} style={[styles.newsHeader, {marginLeft: 4}]}>
                No items to show.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
    </View>
    }

    let items_posts = this.state.posts.map(function(item){
      var img = placeholderImg

      if (item.thumbnail) {
        img = { uri: item.thumbnail.toString() }
      } 

      return (
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => _this._readPost(item)}
        >
          <Image
            source={img}
            style={styles.newsImage}
          />
          <View style={styles.newsContent}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
              <IconI name="ios-paper" style={{color: item.color}} />
              <Text numberOfLines={2} style={[styles.newsHeader, {marginLeft: 4}]}>
                {item.title}
              </Text>
            </View>
            <Grid style={{ marginTop: 25 }}>
              <Col>
                <Text style={styles.newsLink}>{ moment(item.date).fromNow() }</Text>
              </Col>
              <Col>
                <TouchableOpacity
                  style={styles.newsTypeView}
                >
                  { (item.categories) ? (<Text style={styles.newsTypeText}>{item.categories}</Text>) : (<Text style={styles.newsTypeText}>General</Text>)}
                </TouchableOpacity>
              </Col>
            </Grid>
          </View>
        </TouchableOpacity>
      )
    })

    return (<View style={{ backgroundColor: "#fff" }}>
      {items_posts}
    </View>)
  }

  render() {
    const navigation = this.props.navigation;

    if (!this.state.fontLoaded) {
      return (<Text></Text>)
    }

    return (
      <Container>
        <SafeAreaView>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon active name="menu" />
            </Button>
          </Left>
          <Body>
            <Image source={headerLogo} style={styles.imageHeader} />
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.getData() }
            >
              <Icon name="refresh" style={styles.headerIcons} />
            </Button>
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
                        Latest News
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </RNView>
            </View>
          </View>

          { (this.state.isFetching) ? (<Spinner />) : (this._renderPostsList()) }

        </Content>

        <FooterNavigation />
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    selectPost: url => dispatch(selectPost(url))
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  bindAction
)(Newsletter);