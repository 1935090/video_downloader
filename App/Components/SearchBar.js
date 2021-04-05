import React, {Component} from 'react';
import {Container, Header, Item, Input, Icon, Button, Text, Tabs, Tab, ScrollableTab} from 'native-base';
import {StatusBar, Keyboard} from 'react-native';
import PropTypes from 'prop-types';
import styles from './Styles/SearchBarStyles';

Input.defaultProps.selectionColor = '#9F9F9F';

export default class SearchBar extends Component {
  static propTypes = {
    rightBtnFunc: PropTypes.func,
    searchFunc: PropTypes.func,
    clearFunc: PropTypes.func,
  };

  static defaultProps = {
    rightBtnFunc: () => {},
    searchFunc: () => {},
    clearFunc: () => {},
  };

  state = {
    typing: false,
    typingTimeout: null,
    searchOnFocus: false,
    searchStr: ''
  }

  constructor(props) {
    super(props);
  }

  handleSearchOnFocus() {
    this.setState({searchOnFocus: true});
  }

  handleSearchOnBlur() {
    this.setState({searchOnFocus: false});
  }

  handleCancelBtnOnPress() {
    this.props.clearFunc();
    this.setState({searchOnFocus: false, searchStr: ''});
    Keyboard.dismiss();
  }

  search(value) {
    this.state.searchStr = value;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    const self = this;
    this.setState({
      typing: false,
      typingTimeout: setTimeout(function() {
        self.props.searchFunc(value);
      }, 50)
    })
  }

  render() {
    return(
      <Header searchBar rounded style={styles.header}
        androidStatusBarColor="#2c3e50" iosBarStyle="dark-content">
        <Item style={styles.inputGroup}>
          <Icon name="ios-search" style={styles.icon}/>
          <Input placeholder="Search" placeholderTextColor="#9F9F9F"
            style={{color: 'white'}}
            onFocus={this.handleSearchOnFocus.bind(this)}
            onBlur={this.handleSearchOnBlur.bind(this)}
            onChangeText={this.search.bind(this)}
            value={this.state.searchStr}/>
        </Item>
        {(this.state.searchOnFocus && (this.state.searchStr.length > 0)) &&
          <Button transparent onPress={this.handleCancelBtnOnPress.bind(this)}>
            <Text style={styles.cancelBtn}>Clear</Text>
          </Button>}

        {(!this.state.searchOnFocus || !(this.state.searchStr.length > 0)) &&
          <Button transparent onPress={this.handleCancelBtnOnPress.bind(this)}>
            <Icon active name="menu" style={styles.rightBtn}
              onPress={this.props.rightBtnFunc.bind(this)}/>
          </Button>}
      </Header>);
  }
}
