import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Linking, Dimensions, Text, View, ImageBackground} from "react-native";
import Modal from "react-native-modal";
import styles from "./Styles/OptionModalStyles";
import {Content, Title, Left, Card, Footer, CardItem, Button, Right, Container, Icon, Body, Fab, Thumbnail, Header} from 'native-base';
import {Images} from '../Themes';

export default class OptionModal extends Component {
  state = {
    isModalVisible: false,
  };

  static propTypes = {
    isVisible: PropTypes.boolean,
    closeOptionModal: PropTypes.func
  };

  static defaultProps = {
    isVisible: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        swipeDirection={['down']}
        style={{justifyContent: 'flex-end', margin: 0}}
        bounces={false}
      >
      <View style={{padding: 10, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, marginHorizontal: 10}}>
        {this.props.children.concat(
        (<Button rounded block style={{backgroundColor: 'rgba(15,23,36,1)'}} onPress={this.props.closeOptionModal}>
          <Text style={{color: 'white'}}>Close</Text>
          </Button>))}
      </View>
      </Modal>
    )
  }
}
