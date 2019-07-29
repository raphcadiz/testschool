// @flow
import React, { Component } from "react";
import { 
  Image, 
  TouchableOpacity,
  SafeAreaView, 
  Alert, 
  View as RNView,
  ImageBackground,
  Linking
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
      downloads: [],
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
    let apiCall = await fetch('https://www.websitehostingperth.com.au/testschool/wp-json/wp/v2/downloads')
      .then(response => response.json())
      .then(responseJson => {

        let filtered_downloads = this._filterDownloads(responseJson)
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

  _filterDownloads = async (downloads) => {
    var f_downloads = []
    for (var i = 0; i < downloads.length; i++) {
      f_downloads.push({
        id: downloads[i].id,
        title: downloads[i].title.rendered,
        file: downloads[i].download_url.file_link
      })

    }

    await this.setState({
      downloads: f_downloads,
      isFetching: false
    })
    
  }


  _readPost = (item) => {
    this.props.selectPost(item)
    this.props.navigation.navigate("Post")
  }

  _renderDownloadsList = () => {

    let _this = this

    if (!this.state.downloads.length) {
      return <View style={{ backgroundColor: "#fff" }}>
      <TouchableOpacity
          style={{ flexDirection: "row" }}
        >
          <View style={styles.newsContent}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
              <IconI name="ios-paper" />
              <Text numberOfLines={2} style={[styles.newsHeader, {marginLeft: 4}]}>
                No items to show.
              </Text>
            </View>
          </View>
        </TouchableOpacity>
    </View>
    }

    let items_downloads = this.state.downloads.map(function(item){

      return (
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={ () =>  Linking.openURL(item.file.toString()) }
        >
          <View style={styles.newsContent}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 20}}>
              <IconI name="ios-paper" style={{color: item.color, fontSize: 18}} />
              <Text numberOfLines={2} style={[styles.newsHeader, {marginLeft: 4}]}>
                {item.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })

    return (<View style={{ backgroundColor: "#fff" }}>
      {items_downloads}
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
                        Parents Download
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </RNView>
            </View>
          </View>

          { (this.state.isFetching) ? (<Spinner />) : (this._renderDownloadsList()) }

        </Content>

        <FooterNavigation />
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {};
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  bindAction
)(Newsletter);