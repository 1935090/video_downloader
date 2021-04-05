import React, {Component} from 'react';
import {InputGroup, Input, Icon} from 'native-base';
import {TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../Themes';
import styles from './Styles/YourInputStyles';

export default class MyInput extends Component {
  static propTypes = {
    onChangeText: PropTypes.func,
    onIconPress: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    onChangeText: () => {},
    onIconPress: () => {},
    placeholder: '',
    value: ''
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputGroup style={styles.inputGroup}>
        <TouchableOpacity onPress={this.props.onIconPress}>
          <Icon style={styles.icon} name='ios-link'/>
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder={this.props.placeholder}
          placeholderTextColor={'white'} value={this.props.value}
          onChangeText={this.props.onChangeText} />
      </InputGroup>
    )
  }
}
