// @flow
import React, { Component } from "react";
import { NavigationActions, StackActions } from "react-navigation";
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  TextInput
} from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Button,
  Icon,
  View,
  Left,
  Right
} from "native-base";
import { Field, reduxForm } from "redux-form";
import Toast from "react-native-easy-toast";

import styles from "./styles";

const bg = require("../../../assets/bg.png");
const logo = require("../../../assets/logo.png");

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

declare type Any = any;
class LoginForm extends Component {
  textInput: Any;

  componentWillMount() {
    this.props.navigation.navigate("School");
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon
            active
            name={input.name === "email" ? "mail" : "unlock"}
            style={{ color: "#fff" }}
          />
          <TextInput
            ref={c => (this.textInput = c)}
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder={input.name === "email" ? "Email" : "Password"}
            secureTextEntry={input.name === "password" ? true : false}
            {...input}
          />
          {touched && error ? (
            <Icon
              active
              style={styles.formErrorIcon}
              onPress={() => this.textInput.clear()}
              name="close"
            />
          ) : (
            <Text />
          )}
        </Item>
        {touched && error ? (
          <Text style={styles.formErrorText1}>{error}</Text>
        ) : (
          <Text style={styles.formErrorText2}>error here</Text>
        )}
      </View>
    );
  }

  login() {
    const { refs } = this;
    if (this.props.valid) {
      this.props.navigation.navigate("Walkthrough");
      return this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Walkthrough" })]
        })
      );
    } else {
      refs.toast.show("Enter Valid Username & password!");
    }
  }
  skip() {
    this.props.navigation.navigate("Walkthrough");
    return this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Walkthrough" })]
      })
    );
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={bg} style={styles.background}>
          <Content contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.container}>
              <View style={styles.form}>
                <Field
                  name="email"
                  component={this.renderInput}
                  type="email"
                  validate={[email, required]}
                />
                <Field
                  name="password"
                  component={this.renderInput}
                  type="password"
                  validate={[alphaNumeric, minLength8, maxLength15, required]}
                />

                <Button
                  rounded
                  primary
                  block
                  large
                  style={styles.loginBtn}
                  onPress={() => this.login()}
                >
                  <Text
                    style={
                      Platform.OS === "android"
                        ? { fontSize: 16, textAlign: "center" }
                        : { fontSize: 16, fontWeight: "900" }
                    }
                  >
                    Get Started
                  </Text>
                </Button>

                <View style={styles.otherLinksContainer}>
                  <Left>
                    <Button
                      small
                      transparent
                      style={{ alignSelf: "flex-start" }}
                      onPress={() => navigation.navigate("SignUp")}
                    >
                      <Text style={styles.helpBtns}>Create Account</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Button
                      small
                      transparent
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      <Text style={styles.helpBtns}>Forgot Password</Text>
                    </Button>
                  </Right>
                </View>
                <View
                  style={{ flex: 1, alignSelf: "flex-end", marginBottom: 20 }}
                >
                  <Button
                    light
                    small
                    transparent
                    style={styles.skipBtn}
                    onPress={() => this.skip()}
                  >
                    <Text
                      style={
                        ([styles.helpBtns],
                        { top: Platform.OS === "ios" ? null : 0 })
                      }
                    >
                      Skip
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </Content>
        </ImageBackground>
        <Toast
          ref="toast"
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
          position="top"
          positionValue={50}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "red", fontSize: 15 }}
        />
      </Container>
    );
  }
}
const Login = reduxForm({
  form: "login"
})(LoginForm);
export default Login;
