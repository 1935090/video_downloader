import React, {Component} from 'react';
import {Dimensions, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import {Toast, Content, Container, Icon, Button, Text, Card, CardItem, Left, Right, Body}
  from 'native-base';
import {connect} from 'react-redux';
import {ApplicationStyles, Images, Metrics} from '../../Themes';
import SavedVideoActions from '../../Redux/SavedVideoRedux';
import PropTypes from 'prop-types';
const Entities = require('html-entities').AllHtmlEntities;
import SearchBar from '../../Components/SearchBar';
import Video from 'react-native-video';
import Share from 'react-native-share';
import {Linking, Clipboard, Platform, PermissionsAndroid} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import OptionModal from '../../Components/OptionModal';
import CameraRoll from "@react-native-community/cameraroll";
import Spinner from 'react-native-loading-spinner-overlay';
import ListFooter from '../../Components/ListFooter';
import styles from './Styles/SavedVideoStyles';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';

const bannerAdUnitId = TestIds.BANNER // 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const requestExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'My App Storage Permission',
        message: 'My App needs access to your storage ' +
        'so you can save your photos',
      },
    );

    return granted;
  } catch (err) {
    Toast.show({text: 'Failed to request permission',
    buttonText: 'Okay', type: 'default', duration: 1000});
    return null;
  }
};

class SavedVideoScreen extends Component {
  static defaultProps = {
    posts: [],
    loading: false,
  };

  constructor(props) {
    super(props);
    let {width} = Dimensions.get('window');
    this.regex = /(<([^>]+)>)/ig;
    this.entities = new Entities();
    this.state = {
      spinner: false,
      showAlert: false,
      basic: true,
      itemToDelete: {},
      searchStr: '',
      videoListOpacity: 0,
      orientationWidth: width,
      orientationHeight: width * 0.56,
      optionVisible: false,
      selectedItem: {}
    };
    this.regex = /(<([^>]+)>)/ig;
    this.entities = new Entities();
  }

  handleShare(title, message, url) {
    try {
      Share.open({url : url, subject:title, message: message, title : title})
      .then((res) => {})
      .catch((err) => {});
    } catch(error) {}
  }

  fetchCopiedText = async () => {
    const text = await Clipboard.getString()
    this.setState({videoPageUrl: text});
  }

  async saveVideoToCameraRoll(uri) {
    this.setState({optionVisible: false});
    this.setState({spinner: true});
    if (Platform.OS === 'android') {
      await requestExternalStoragePermission();
    }

    try {
      await CameraRoll.saveToCameraRoll(uri, 'video');
      this.setState({spinner: false});
      Toast.show({text: 'Saved the video to the camera roll successfully.',
        buttonText: 'Okay', type: 'default', duration: 1000});
    } catch(error) {
      this.setState({spinner: false});
      Toast.show({text: 'Error occured. Please try again later.',
        buttonText: 'Okay', type: 'default', duration: 1000});
    }
  }

  searchVideo(searchStr) {this.props.searchVideo(searchStr);}

  onLayout(event) {
    const {x, y, width} = event.nativeEvent.layout;
    this.setState({videoListOpacity: 1, orientationWidth: width, orientationHeight: width * 0.56});
  }

  hideAlert() {this.setState({showAlert: false, itemToDelete: {}});}

  removeVideo(item) {this.setState({showAlert: true, itemToDelete: item});}

  openLinkOnBrowser() {
    this.setState({optionVisible: false});
    Linking.openURL(this.state.selectedItem.url);
  }

  clearSearchInput() {this.props.searchVideo("")};

  render() {
    return (
      <ImageBackground source={Images.background}
        style={ApplicationStyles.imageBackground} resizeMode={'cover'}>
        <Container style={styles.container}>
          <SearchBar
            value={this.props.searchStr}
            rightBtnFunc={() => this.props.navigation.openDrawer()}
            searchFunc={this.searchVideo.bind(this)}
            clearFunc={this.clearSearchInput.bind(this)}
          />
          <BannerAd
          unitId={bannerAdUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          />
          <Content>
            <FlatList
              data={this.props.videos}
              style={{opacity: this.state.videoListOpacity}}
              ListFooterComponent={ListFooter}
              renderItem={({item}) => (
                <Card style={styles.videoDownloaderCard}>
                  <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
                  <CardItem style={styles.videoDownloaderCardItem}>
                    <Body
                      onLayout={this.onLayout.bind(this)}>
                      <Video source={{uri: item.path}}
                        key={item.name}
                        paused={true}
                        ref={p => {this.videoPlayer = p;}}
                        style={{width: this.state.orientationWidth,
                          height: this.state.orientationHeight}}
                        controls={true}
                      />
                    </Body>
                  </CardItem>
                  <CardItem style={styles.cardFooter}>
                    <Left>
                      <Button transparent onPress={this.props.bookmark}
                        onPress={() => this.removeVideo(item)}>
                        <Icon name="trash" style={styles.actionIcon}/>
                        <Text style={styles.actionIcon}>Remove</Text>
                      </Button>
                    </Left>
                    <Body>
                      <Button transparent onPress={() => this.handleShare(item.name, '', item.url)}>
                        <Icon active name="paper-plane" style={styles.actionIcon}/>
                        <Text style={styles.actionIcon}>Share</Text>
                      </Button>
                    </Body>
                    <Right>
                      <Button transparent onPress={() => this.setState({optionVisible: true, selectedItem: item})}>
                        <Icon name="md-more" style={styles.actionIcon}/>
                        <Text style={styles.actionIcon}>More</Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              )}
              numColumns={1}
              keyExtractor={(item, index) => item.name}
            />
          </Content>
        </Container>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Delete video"
          message="Are you sure you want to delete this video?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="rgba(15,23,36,0.8)"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.props.deleteVideo(this.state.itemToDelete.id);
            this.hideAlert();
          }}
        />
        <OptionModal isVisible={this.state.optionVisible}
          closeOptionModal={() => this.setState({optionVisible: false})}>
          <Spinner
            visible={this.state.spinner}
            overlayColor={'rgba(0, 0, 0, 0.8)'}
            textContent={'Saving...'}
            textStyle={styles.spinnerTextStyle}
          />
          <TouchableOpacity onPress={() => this.saveVideoToCameraRoll(this.state.selectedItem.path)}>
            <Card style={styles.cardFooterButton}>
              <CardItem>
                <Icon active name="download" />
                <Text>Save to camera roll</Text>
              </CardItem>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.openLinkOnBrowser.bind(this)}>
            <Card style={styles.cardFooterButton}>
              <CardItem>
                <Icon active name="share-alt" />
                <Text>Open on browser</Text>
              </CardItem>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {Clipboard.setString(this.state.selectedItem.url);
              this.setState({optionVisible: false});}}>
            <Card style={styles.cardFooterButton}>
              <CardItem>
                <Icon active name="copy" />
                <Text>Copy link</Text>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </OptionModal>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
  let videos = state.savedVideo.items.filter(video =>
    video.name.toLowerCase().indexOf(state.savedVideo.searchStr.toLowerCase()) >= 0);

  return {
    searchStr: state.savedVideo.searchStr,
    videos: videos
  };
}

const mapDispatchToProps = (dispatch) => {
  return ({
    deleteVideo: (videoId) => {
      dispatch(SavedVideoActions.remove(videoId));
    },
    searchVideo: (searchStr) => {
      dispatch(SavedVideoActions.search(searchStr));
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedVideoScreen);
