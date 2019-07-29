const React = require("react-native");
const primary = require("../../theme/variables/commonColor").brandPrimary;
const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;

export default {
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  bg: {
    backgroundColor: primary
  },
  newsContent: {
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  newsHeader: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 19
  },
  newsLink: {
    color: "#666",
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  newsTypeView: {
    // borderBottomWidth: 1,
    borderBottomColor: "#666",
    alignSelf: "flex-end"
  },
  newsTypeText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 5
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: "contain"
  },
  slide: {
    flex: 1,
    width: deviceWidth,
    // height: 330,
    backgroundColor: "transparent"
  },
  newsPoster: {
    height: 220,
    width: null,
    position: "relative",
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperTextContent: {
    position: "absolute",
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsPosterHeader: {
    // fontWeight: "900",
    fontSize: 35,
    textAlign: 'center',
    flexWrap: "wrap"
  }
};
