import {StyleSheet} from 'react-native';
import {Metrics, Colors, ApplicationStyles, Fonts} from '../../../Themes';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent
  },
  list: {
    height: Metrics.screenHeight
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
    marginBottom: 0,
    marginTop: Metrics.baseMargin
  },
  videoDownloaderCardItem: {
    paddingBottom: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    backgroundColor: Colors.black,
    borderWidth: 0,
    shadowColor: Colors.transparent
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
  cardFooterButton: {
    borderColor: Colors.transparent,
    marginBottom: Metrics.baseMargin,
    elevation: 0
  },
  cardFooter: {
    backgroundColor: Colors.baseDark,
    paddingTop: 0,
    paddingBottom: 0,
  },
  actionIcon: {
    color: Colors.white
  },
  spinnerTextStyle: {
    ...Fonts.style.normal,
    color: 'white'
  }
})
