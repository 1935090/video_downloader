import React, { Component } from 'react'
import {TouchableOpacity} from 'react-native'
import {FooterTab, Button, Icon} from 'native-base';
import {Colors} from '../Themes';

export default class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  getIcon() {
    switch(this.props.index) {
      case 0:
        return 'keypad'
      case 1:
        return 'bookmark'
    }
  }

  render() {
    return (
      <FooterTab style={{elevation: 0, backgroundColor: 'transparent'}}>
        <Button style={{borderRadius: 0}} onPress={() => this.props.navigation.navigate(this.props.routeName)}>
          <Icon name={this.getIcon()} style={{color: this.props.focused? Colors.white: Colors.placeholder}}/>
        </Button>
      </FooterTab>
    )
  }
}
