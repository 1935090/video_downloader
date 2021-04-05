import {StyleSheet} from 'react-native';
import {Metrics, Colors, ApplicationStyles, Fonts} from '../../../Themes';

export default StyleSheet.create({
  content: {
    marginTop: Metrics.baseMargin
  },
  downloadButton: {
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    backgroundColor: Colors.baseDark,
    borderWidth: 0
  },
  buttonTxt: {
    color: Colors.white
  },
  videoDownloaderCard: {
    ...Fonts.style.normal,
    backgroundColor: Colors.transparent,
    color: Colors.white,
    textAlign: 'center',
    borderLeftWidth: 0, // Remove Border
    borderRightWidth: 0, // Remove Border
    borderTopWidth: 0, // Remove Border
    borderBottomWidth: 0, // Remove Border
    borderWidth: 0,
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin,
    marginTop: 0,
    marginBottom: Metrics.baseMargin,
    elevation: 0,
  },
  videoDownloaderCardItem: {
    backgroundColor: Colors.black,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    marginBottom: Metrics.baseMargin,
    borderWidth: 0,
    shadowColor: Colors.transparent
  },
  saveButtonCardItem: {
    ...ApplicationStyles.noBorder,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    backgroundColor: Colors.transparent
  },
  saveButton: {
    flex: 1,
    // '#0F1724',
    backgroundColor: Colors.baseDark
  },
  title: {
    ...Fonts.style.normal,
    backgroundColor: Colors.baseDark,
    color: 'white',
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    textAlign: 'center',
  },
  disabled: {
    color: Colors.grey
  },
  fullscreen: {
    // Style in a way that it's fullscreen based on your app
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
})
