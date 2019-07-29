import React from "react";
import { Root } from "native-base";
import Setup from "./src/boot/setup";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }


  render() {
    console.disableYellowBox = true;

    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    
    return <Setup />;
  }
}
