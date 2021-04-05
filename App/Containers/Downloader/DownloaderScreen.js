import React, {Component} from 'react';
import YourHeader from '../../Components/YourHeader';
import {Colors} from '../../Themes';
import {Container, Card, CardItem, Icon, Body, Content, Text, Button, Left,
  Right, Title} from 'native-base';
import Video from 'react-native-video';
import {StyleSheet, ImageBackground, Image, Dimensions} from 'react-native';
import YourInput from '../../Components/YourInput';
import {Images, ApplicationStyles} from '../../Themes';
import {BarIndicator} from 'react-native-indicators';
import {Clipboard, Keyboard} from 'react-native';
import DownloaderActions from '../../Redux/DownloaderRedux';
import styles from './Styles/DownloaderStyles';
import {connect} from 'react-redux';
import * as Progress from 'react-native-progress';
const Entities = require('html-entities').AllHtmlEntities;
import VideoPlayer from 'react-native-video-controls';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const bannerAdUnitId = TestIds.BANNER // 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

class DownloaderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPageUrl: this.props.videoPostUrl,
    }
    this.entities = new Entities();
  }

  fetchCopiedText = async () => {
    const text = await Clipboard.getString()
    this.setState({videoPageUrl: text});
  }

  onLayout(event) {
    const {width} = event.nativeEvent.layout;
    this.props.updateOrientationSize(width, width * 0.5);
  }

  onTextValueChange(val) {
    this.setState({videoPageUrl: val, videoDisplayUri: ''});
  }

  render() {
    const sizeRatio = this.props.orientationHeight / this.props.orientationWidth;
    const videoCardOpacity = sizeRatio == 0.5? 1 : 0;
    return (
      <ImageBackground source={Images.background}
        style={ApplicationStyles.imageBackground} resizeMode={'cover'}>
        <Container style={{backgroundColor: 'transparent'}}>
          <YourHeader
            leftBtnIcon={'menu'}
            leftBtnFunc={() => this.props.navigation.openDrawer()}
          />
          <BannerAd
            unitId={bannerAdUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
          <Content style={styles.content}>
            <YourInput placeholder='⪡ Press to paste facebook video url...'
              onIconPress={this.fetchCopiedText.bind(this)}
              value={this.state.videoPageUrl}
              onChangeText={this.onTextValueChange.bind(this)} />

            <Button block style={styles.downloadButton}
              onPress={() => this.props.extract(this.state.videoPageUrl)}>
              {this.props.extracting == false && <Text>Download</Text>}
              {this.props.extracting == true && <BarIndicator size={20} color='white' />}
            </Button>
            <Card style={{...styles.videoDownloaderCard, opacity: videoCardOpacity}}>
              {this.props.videoTitle.length > 0 &&
                <Text numberOfLines={1} style={styles.title}>
                  {this.entities.decode(this.props.videoTitle)}
                </Text>}
              {this.props.videoDisplayUri.length > 0 &&
              [(<CardItem onLayout={this.onLayout.bind(this)}
                  style={styles.videoDownloaderCardItem}>
                <Body>
                  <Video source={{uri: this.props.videoDisplayUri}}
                    paused={true}
                    ref={p => {this.videoPlayer = p;}}
                    style={{width: this.props.orientationWidth, height: this.props.orientationHeight}}
                    controls={true}
                  />
                </Body>
              </CardItem>),
              (<CardItem style={styles.saveButtonCardItem}>
                <Left style={{borderRightWidth: 2, flex: 1, borderColor: Colors.transparent}}>
                  <Button disabled={this.props.hdVideoSaved || this.props.saving}
                    block iconLeft style={styles.saveButton}
                    onPress={() => this.props.save('hd')}>
                    <Icon name='download' style={this.props.hdVideoSaved || this.props.saving? styles.disabled: null}/>
                    <Text style={this.props.hdVideoSaved || this.props.saving? styles.disabled: null}>Save HD</Text>
                  </Button>
                </Left>
                <Right style={{borderLeftWidth: 2, flex: 1, borderColor: Colors.transparent}}>
                  <Button disabled={this.props.sdVideoSaved || this.props.saving}
                    block iconLeft style={styles.saveButton}
                    onPress={() => this.props.save('sd')}>
                    <Icon name='download' style={this.props.sdVideoSaved || this.props.saving? styles.disabled: null}/>
                    <Text style={this.props.sdVideoSaved || this.props.saving? styles.disabled: null}>Save SD</Text>
                  </Button>
                </Right>
              </CardItem>)]}
              {this.props.saving == true &&
                <Progress.Bar color={'white'} progress={this.props.progress}
                  width={this.props.orientationWidth} />}
            </Card>
          </Content>
        </Container>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orientationWidth: state.downloader.orientationWidth,
    orientationHeight: state.downloader.orientationHeight,
    videoPostUrl: state.downloader.videoPostUrl,
    videoTitle: state.downloader.videoTitle,
    videoDisplayUri: state.downloader.videoDisplayUri,
    extracting: state.downloader.extracting,
    saving: state.downloader.saving,
    progress: state.downloader.savingProgress,
    hdVideoSaved: state.downloader.hdVideoSaved,
    sdVideoSaved: state.downloader.sdVideoSaved,
  };
}

const mapDispatchToProps = (dispatch) => {
  return ({
    extract: (videoPostUrl) => {
      dispatch(DownloaderActions.extractTrigger(videoPostUrl));
    },
    save: (savingType) => {
      dispatch(DownloaderActions.saveTrigger(savingType));
    },
    updateOrientationSize: (width, height) => {
      dispatch(DownloaderActions.updateOrientationSize(width, height));
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloaderScreen);
