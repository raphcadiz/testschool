// @flow
import React, { Component } from "react";
import { ImageBackground, StatusBar, TextInput } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Item,
  View,
  Footer
} from "native-base";
import { Field, reduxForm } from "redux-form";
import Toast from "react-native-easy-toast";
import styles from "./styles";

const required = value => (value ? undefined : "Required");
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
type Props = {
  navigation: () => void
};
declare type Any = any;
class ForgotPasswordForm extends Component {
  textInput: Any;
  state: {
    offset: {
      x: 0,
      y: 0
    }
  };
  props: Props;
  constructor(props: Props) {
    super(props);
    this.state = {
      offset: {
        x: 0,
        y: 0
      },
      name: ""
    };
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <View>
        <Item error={error && touched} rounded style={styles.inputGrp}>
          <Icon active name="mail" style={styles.icon} />
          <TextInput
            placeholderTextColor="#FFF"
            style={styles.input}
            placeholder="Email"
            {...input}
            ref={c => (this.textInput = c)}
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

  forgotPassword() {
    const { refs } = this;
    if (this.props.valid) {
      this.props.navigation.goBack();
    } else {
      refs.toast.show("Enter Valid Email");
    }
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={require("../../../assets/bg-signup.png")}
          style={styles.background}
        >
          <Content contentOffset={this.state.offset}>
            <Content padder scrollEnabled={false}>
              <Text style={styles.forgotPasswordHeader}>
                Forgot Your Password?
              </Text>
              <View style={styles.forgotPasswordContainer}>
                <Field
                  name="email"
                  component={this.renderInput}
                  type="email"
                  validate={[email, required]}
                />

                <Button
                  rounded
                  block
                  bordered
                  onPress={() => this.forgotPassword()}
                  style={styles.emailBtn}
                >
                  <Text style={{ color: "#FFF" }}>Send Email</Text>
                </Button>
              </View>
            </Content>
          </Content>
          <Footer
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 30
            }}
          >
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.helpBtns}>Back To Login</Text>
            </Button>
          </Footer>
          <Toast
            ref="toast"
            style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            position="top"
            positionValue={100}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{ color: "red", fontSize: 15 }}
          />
        </ImageBackground>
      </Container>
    );
  }
}

const ForgotPassword = reduxForm({
  form: "help"
})(ForgotPasswordForm);
export default ForgotPassword;
