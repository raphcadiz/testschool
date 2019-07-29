const React = require("react-native");
const {Dimensions, Platform} = React;
const primary = require("../../theme/variables/commonColor").brandPrimary;

const deviceWidth = Dimensions.get("window").width;

export default {
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
    fontWeight: "bold"
  },
  newsLink: {
    color: Platform.OS === "android" ? "#777" : "#666",
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  newsTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: Platform.OS === "android" ? "#777" : "#666",
    alignSelf: "flex-end"
  },
  newsTypeText: {
    color: Platform.OS === "android" ? "#777" : "#666",
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 2
  },
  newsPoster: {
    height: 220,
    width: null,
    position: "relative",
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsPosterHeader: {
    // fontWeight: "900",
    fontSize: 35,
    textAlign: 'center',
    flexWrap: "wrap"
  },
  newsPosterLink: {
    opacity: 0.8,
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold",
    color:"white",
  },
  IIconInewsLink:{
    opacity: 0.8,
    fontSize: 12,
    alignSelf: "flex-start",
    fontWeight: "bold",
    color: Platform.OS === "android" ? "#777" : "#666",
  },
  newsPosterTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignSelf: "flex-end"
  },
  newsPosterTypeText: {
    opacity: 0.8,
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 2
  },
  timeIcon: {
    fontSize: 20,
    marginLeft: Platform.OS === "android" ? 15 : 0,
    paddingLeft: Platform.OS === "android" ? 0 : 20,
    paddingRight: 5,
    marginTop: Platform.OS === "android" ? -1 : -3,
    color: "#666"
  },
  timePosterIcon: {
    fontSize: 20,
    marginLeft: Platform.OS === "android" ? 20 : 0,
    paddingLeft: Platform.OS === "android" ? 0 : 20,
    paddingRight: 5,
    marginTop: Platform.OS === "android" ? -1 : -2,
    color: "#fff"
  },
  slide: {
    flex: 1,
    width: deviceWidth,
    // height: 330,
    backgroundColor: "transparent"
  },
  swiperTextContent: {
    position: "absolute",
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperDot: {
    backgroundColor: "rgba(0,0,0,.8)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 0
  },
  swiperActiveDot: {
    backgroundColor: "#fff",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 0
  },
  swiperContentBox: {
    paddingTop: 20,
    paddingBottom: 20
  },
  container: {
    flex: 1,
    width: null,
    height: null
  },
  logoHeader: {
    width: 20,
    height: 28,
    alignSelf: "center"
  },
  text: {
    fontSize: 15,
    color: "#000",
    marginBottom: 10
  },
  header: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: Platform.OS === "ios" ? undefined : -30
  },
  rowHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingTop: Platform.OS === "android" ? 0 : 0
  },
  imageHeader: {
    height: 25,
    width: 25,
    resizeMode: "contain"
  },
  iconBig: {
    width: 80,
    height: 137,
    flex: 1,
    marginBottom: 20
  },
  containerGrid: {
    paddingTop: 30,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 20
  },
  headerText: {
    color: primary,
    fontSize: 30,
    fontWeight: "900",
    textAlign: 'center',
    flexWrap: "wrap"
  },
  contentText: {
    color: '#000',
    fontSize: 18
  }
};
