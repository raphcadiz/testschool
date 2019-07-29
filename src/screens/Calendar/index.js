// @flow
import React, { Component } from "react";
import { Image, TouchableOpacity,SafeAreaView, Alert } from "react-native";
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
import { Calendar as MonthCalendar } from "react-native-calendars";
var moment = require('moment');
import IconI from "react-native-vector-icons/Ionicons";

import { selectEvent } from "./actions";

import styles from "./styles";
const primary = require("../../theme/variables/commonColor").brandPrimary;
const placeholderImg = require("../../../assets/placeholder.jpg");
import FooterNavigation from "../../components/FooterNav/";

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const headerLogo = require("../../../assets/header-logo.png");
type Props = {
  navigation: () => void,
  day: string
};
class Calendar extends Component {
  state: {
    date: Object,
    selected: string
  };

  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      date: new Date(),
      selected: "",
      cal_events: {},
      events: [],
      rendered_events: [],
      isFetching: false,
    };
  }

  componentDidMount () {
    this.getData()
  }

  async getData() {
    if (this.state.isFetching) {
      return;
    }

    this.setState({isFetching: true})
    let start = moment().startOf('year').format('YYYY-MM-DD');
    let end = moment().endOf('year').format('YYYY-MM-DD');
    let apiCall = await fetch('https://www.websitehostingperth.com.au/testschool/wp-json/tribe/events/v1/events?start_date='+start+'&end_date='+end)
      .then(response => response.json())
      .then(responseJson => {

        let filtered_events = this._filterEvents(responseJson.events)
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

  _filterEvents = async (events) => {
    var cal_events = {}
    var f_events = []
    for (var i = 0; i < events.length; i++) {

      let categories = events[i].categories.map(function(cat){
        return cat.name;
      })

      let start_date = events[i].start_date.split(' ')[0]
      let end_date = events[i].end_date.split(' ')[0]

      let affected_dates = [];
      this._getDatesForRange(start_date, end_date).map(function(d){
        affected_dates.push(moment(d).format('YYYY-MM-DD'))
      })

      f_events.push({
        id: events[i].id,
        title: events[i].title,
        description: events[i].description,
        categories: (events[i].categories) ? categories : '',
        featured_image: (events[i].image) ? events[i].image['url'] : '',
        thumbnail: (events[i].image) ? events[i].image['sizes']['thumbnail']['url'] : '',
        all_day: events[i].all_day,
        start_date: events[i].start_date,
        start_date_details: events[i].start_date_details,
        end_date: events[i].end_date,
        end_date_details: events[i].end_date_details,
        venue: events[i].venue,
        organizer: events[i].organizer,
        affected_dates: affected_dates,
        timezone: events[i].timezone,
        color: colorArray[i]
      })

      let dates = []
      if (start_date.toString() === end_date.toString()) {
        dates.push(start_date.toString())
      } else {
        this._getDatesForRange(start_date, end_date).map(function(d){
          dates.push(moment(d).format('YYYY-MM-DD'))
        })
      }

      let counter = 0
      for (var x = 0; x < dates.length; x++) {

        let yabe = dates[x]

        if (dates[x] in cal_events) {

          let periods = cal_events[yabe].periods

          if (x === 0) {
            counter = periods.length
          }

          if (periods.length < counter) {
            let new_loop_counter = counter - periods.length
            for(var w = 0; w < new_loop_counter; w++) {
              periods.push({ color: 'transparent' })
            }
          }
          periods.push({ startingDay: false, endingDay: false, color: colorArray[i] })
          let periods_data = {
            periods: periods
          }
          cal_events[yabe] = periods_data

        } else {

          let perr = []
          for(var y = 0; y < counter; y++) {
            perr.push({ color: 'transparent' })
          }
          perr.push({ startingDay: false, endingDay: false, color: colorArray[i] })

          let periods_data = {
            periods: perr
          }
          cal_events[yabe] = periods_data

        }
        
      } //end foreach

    }

    await this.setState({
      cal_events: cal_events,
      events: f_events,
      isFetching: false
    })

    this._filterEventsByMonth(moment().format('MM'))

    
  }

  _getDatesForRange = (start, end) => {
    var dates = [];

    var currDate = moment(start).startOf('day');
    var lastDate = moment(end).startOf('day');

    dates.push(start);
    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().toDate());
    }
    dates.push(end);

    return dates;
  }

  onDateChange(date: Object) {
    this.setState({ date });
    console.log(date)
  }
  onDayPress(day: any) {
    this.setState({
      selected: day.dateString
    });
    console.log(day)
  }

  _filterEventsByMonth = (month) => {

    let nmonth = ('0' + month).slice(-2)

    var f_events = []
    for (var i = 0; i < this.state.events.length; i++) {
      if (this.state.events[i].start_date_details['month'] == nmonth) {
        f_events.push(this.state.events[i])
      }

    }

    this.setState({
      rendered_events: f_events
    })
  }

  _readEvent = (item) => {
    this.props.selectEvent(item)
    this.props.navigation.navigate("Event")
  }

  _renderEventsList = () => {

    let _this = this

    if (!this.state.rendered_events.length) {
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

    let items_posts = this.state.rendered_events.map(function(item){
      var img = placeholderImg

      if (item.thumbnail) {
        img = { uri: item.thumbnail.toString() }
      } 

      return (
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => _this._readEvent(item)}
        >
          <Image
            source={img}
            style={styles.newsImage}
          />
          <View style={styles.newsContent}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
              <IconI name="ios-calendar" style={{color: item.color}} />
              <Text numberOfLines={2} style={[styles.newsHeader, {marginLeft: 4}]}>
                {item.title}
              </Text>
            </View>
            <Grid style={{ marginTop: 25 }}>
              <Col>
                <Text style={styles.newsLink}>{ moment(item.start_date).format('MMM D hh:mm a') }</Text>
              </Col>
              <Col>
                <TouchableOpacity
                  style={styles.newsTypeView}
                >
                  { (item.categories.length) ? (<Text style={styles.newsTypeText}>{item.categories.join(', ')}</Text>) : (<Text style={styles.newsTypeText}>General</Text>)}
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
          <View style={styles.bg}>
            <MonthCalendar
              onDayPress={e => this.onDayPress(e)}
              disableMonthChange={true}
              markedDates={this.state.cal_events}
              markingType='multi-period'
              onMonthChange={(month) => this._filterEventsByMonth(month.month) }
              theme={{
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#222e84",
                selectedDayBackgroundColor: "#222e84",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#222e84",
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                dotColor: "#00adf5",
                selectedDotColor: "#ffffff",
                arrowColor: "#222e84",
                monthTextColor: "#000"
              }}
            />
          </View>

          { (this.state.isFetching) ? (<Spinner />) : (this._renderEventsList()) }

        </Content>

        <FooterNavigation />
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    selectEvent: url => dispatch(selectEvent(url))
  };
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  bindAction
)(Calendar);