import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, ApplicationStyles} from '../../Themes';

export default StyleSheet.create({
  inputGroup: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    backgroundColor: '#0F1724',
    opacity: 0.8,
    borderRadius: Metrics.baseMargin / 2,
    height: Metrics.inputHeight,
    shadowColor: Colors.white,
    shadowOffset: {
      width: Metrics.shadow.width,
      height: Metrics.shadow.height
    },
    shadowOpacity: Metrics.shadow.opacity,
    shadowRadius: Metrics.shadow.radius,
    elevation: Metrics.shadow.elevation,
    borderBottomWidth: 0
  },
  input: {
    fontFamily: Fonts.type.base,
    color: Colors.white,
    paddingRight: 50,
  },
  icon: {
    ...ApplicationStyles.shadow,
    color: Colors.white,
    elevation: 50,
    backgroundColor: 'rgba(7,13,23, 0.85)',
    borderRadius: Metrics.baseMargin/3,
    paddingBottom: Metrics.baseMargin/3,
    paddingTop : Metrics.baseMargin/3,
    paddingLeft: Metrics.baseMargin/1.8,
    paddingRight: Metrics.baseMargin/1.8,
    marginHorizontal: Metrics.baseMargin * 0.75
  }
})
