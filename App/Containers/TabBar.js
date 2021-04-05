import React, { Component } from 'react'
import {FlatList, RefreshControl, Dimensions, ScrollView, Image as ImageC, ImageBackground, View, TouchableOpacity} from 'react-native'
import {Toast, Card, CardItem, Container, Thumbnail, Header, Title, Content,
  Footer, FooterTab, Button, Left, Right, Body, Icon, Text} from 'native-base';
import {Fonts, Images, Colors, Metrics, ApplicationStyles} from '../Themes';
import SearchInput from '../Components/SearchInput';
import TabBarButton from './TabBarButton';
import styles from './Styles/TabBarStyles';

const getCurrentRouteName = function(navigationState) {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export default class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    const {routes, index} = navigation.state;
    const routeName = getCurrentRouteName(navigation.state);
    return (
      <Footer style={styles.footer}>
        {
          routes.map((route, index) => (
            <TabBarButton
              navigation={navigation}
              routeName={route.routeName}
              focused={navigation.state.index === index}
              index={index}
            />
          ))
        }
      </Footer>
    )
  }
}
