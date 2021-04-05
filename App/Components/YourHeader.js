import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Header, Left, Right, Button, Title, Body, Text} from 'native-base';
import Icomoon from './Icomoon';
import styles from './Styles/YourHeaderStyles';
import Images from '../Themes/Images';
import {Image} from 'react-native';

export default class YourHeader extends Component {
  static propTypes = {
    style: PropTypes.object,
    onLayout: PropTypes.func,
    leftBtnFunc: PropTypes.func,
    leftBtnIcon: PropTypes.string,
    rightBtnFunc: PropTypes.func,
    rightBtnIcon: PropTypes.string,
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header
        androidStatusBarColor="#2c3e50"
        style={[styles.headerBar, this.props.style]} onLayout={this.props.onLayout}>
        <Left style={styles.leftButton}>
        {
          (this.props.leftBtnIcon && this.props.leftBtnFunc) &&
          (
            <Button transparent onPress={this.props.leftBtnFunc}>
              <Icomoon name={this.props.leftBtnIcon} size={25} style={styles.icon}/>
            </Button>
          )
        }
        </Left>
        <Body style={styles.body}>
          <Image source={Images.logo} style={styles.logoImg} resizeMode={'stretch'}/>
        </Body>
        <Right style={styles.rightButton}>
        {
          (this.props.rightBtnIcon && this.props.rightBtnFunc) &&
          (
            <Button transparent onPress={this.props.rightBtnFunc}>
              <Icomoon name={this.props.rightBtnIcon} size={25} style={styles.icon}/>
            </Button>
          )
        }
        </Right>
      </Header>
    )
  }
}
