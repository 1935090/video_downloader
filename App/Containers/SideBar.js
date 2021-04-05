import React, {Component} from 'react';
import {SafeAreaView, TouchableOpacity}  from 'react-native';
import {Thumbnail, Card, CardItem, View, Body, Container, Left, Right,
  Icon, Text} from "native-base";
import styles from './Styles/SidebarStyles';
import Images from '../Themes/Images';
import Icomoon from '../Components/Icomoon';
import Colors from  '../Themes/Colors';

class SideBar extends Component {
  render() {
    return (
      <SafeAreaView>
        <Card style={styles.headerCard}>
          <CardItem style={{paddingRight: 0}}>
            <Left>
              <Thumbnail small medium square source={Images.logo}/>
              <Body>
                <Text style={styles.headerText}>
                Video Downloader
                </Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('downloaderScreen')}>
          <Card style={styles.menuItem}>
            <CardItem>
              <Icon name='keypad' size={33} style={styles.itemIcon} />
              <Text style={styles.itemText}>
              Downloader
              </Text>
              </CardItem>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('savedVideoScreen')}>
          <Card style={styles.menuItem}>
            <CardItem>
              <Icon name='bookmark' size={33} style={styles.itemIcon} />
              <Text style={styles.itemText}>
              Saved Videos
              </Text>
              </CardItem>
          </Card>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

export default SideBar;
