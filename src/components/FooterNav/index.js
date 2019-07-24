// @flow
import React, { Component } from "react";
import {
  Platform,
  Linking
} from "react-native";
import { connect } from "react-redux";
import IconI from "react-native-vector-icons/Ionicons";
import {
  Button,
  Icon,
  Left,
  Footer,
  FooterTab
} from "native-base";



class FooterNave extends Component {
  render() {
    return (
        <Footer>
            <FooterTab>

            <Button
                onPress = {() => Linking.openURL(`tel:888888`)}
            >
                <Icon name="call" size={45} style={{color: "#FFF"}} />
            </Button>
            <Button
                onPress = {() => Linking.openURL(`mailto:mail@gmail.com`)}
            >
                <Icon name="mail" size={45} style={{color: "#FFF"}} />
            </Button>
            <Button>
                <Icon name="settings" size={45} style={{color: "#FFF"}} />
            </Button>
            </FooterTab>
        </Footer>
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
)(FooterNave);
