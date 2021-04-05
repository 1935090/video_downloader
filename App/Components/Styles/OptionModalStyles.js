import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, ApplicationStyles} from '../../Themes';

export default StyleSheet.create({
  imageBackground: ApplicationStyles.imageBackground,
  container: {
    backgroundColor: Colors.white,
    height: Metrics.screenHeight * 0.5,
    borderRadius: Metrics.baseMargin,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },  
  name: {
    fontFamily: Fonts.base,
    fontWeight: "400",
    fontSize: Metrics.baseMargin
  },
  description: {
    textAlign: 'center',
    fontFamily: Fonts.base,
    lineHeight: Metrics.doubleBaseMargin,
    fontWeight: "200",
    fontSize: Metrics.baseMargin
  },
  button: {
    backgroundColor: Colors.white,
    borderWidth: 0,
    padding: Metrics.baseMargin,
    ...ApplicationStyles.shadow,
    shadowOpacity: 0.1,
    margin: 0,
  },
  icon: {
    fontSize: Fonts.size.h3,
    color: Colors.black,
    margin: 0,
    padding: 0,
  },
  footer: {
    backgroundColor: Colors.transparent,
    borderTopWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: Metrics.baseMargin,
    elevation: 0
  },
});
