// @flow
import React, { Component } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  View,
  Text,
  List
} from "native-base";

import datas from "./data";
import styles from "./style";

import IconI from "react-native-vector-icons/Ionicons";

class TabThree extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Content showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: "#FFF" }}>
            <List
              dataArray={datas}
              renderRow={data => (
                <Card style={styles.card}>
                  <CardItem style={styles.cardHeader} header>
                    <Thumbnail
                      small
                      source={data.image}
                      style={
                        Platform.OS === "android"
                          ? { borderRadius: 40, alignSelf: "flex-start" }
                          : { alignSelf: "flex-start" }
                      }
                    />
                    <View>
                      <Text style={styles.commentName}>{data.name}</Text>
                      <Text style={styles.commentText}>{data.comment}</Text>
                      <View style={styles.commentDateView}>
                        <IconI name="ios-time" style={styles.timeIcon} />
                        <Text style={styles.date}>{data.time}</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.commentLikeView}>
                      <IconI name="ios-heart" style={styles.likeIcon} />
                      <Text style={styles.date}>{data.likes}</Text>
                    </TouchableOpacity>
                  </CardItem>
                </Card>
              )}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect()(TabThree);
