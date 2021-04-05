import React, {Component} from 'react';
import {InputGroup, Input, Icon} from 'native-base';
import PropTypes from 'prop-types';
import {Colors} from '../Themes';
import styles from './Styles/SearchInputStyles';

export default class SearchInput extends Component {
  static propTypes = {
    searchFunc: PropTypes.func,
    style: PropTypes.object,
    placeholderColor: PropTypes.string,
    backgroundColor: PropTypes.string
  };

  state = {
    typing: false,
    typingTimeout: null
  }

  static defaultProps = {
    searchFunc: () => {},
    placeholderColor: Colors.placeholder,
    backgroundColor: Colors.white
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  search(value) {
    const self = this;
    self.state.searchStr = value;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    self.setState({
      typing: false,
      typingTimeout: setTimeout(function() {
        self.props.searchFunc(value);
      }, 200)
    })
  }

  componentWillUnmount() {
    clearTimeout(this.state.typingTimeout);
  }

  render() {
    return (
      <InputGroup style={[styles.inputGroup, this.props.style, {backgroundColor: this.props.backgroundColor}]}>
        <Icon style={styles.icon} name='ios-search' style={{color: this.props.placeholderColor}}/>
        <Input style={styles.input} placeholder='Search' placeholderTextColor={this.props.placeholderColor}
          onChangeText={this.search.bind(this)} value={this.state.searchStr} clearButtonMode='always'/>
      </InputGroup>
    )
  }
}
