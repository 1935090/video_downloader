import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../Themes';

export default StyleSheet.create({
  inputGroup: {
    paddingRight: Metrics.baseMargin,
    backgroundColor: Colors.white,
    height: Metrics.inputHeight,
    shadowColor: Colors.black,
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
  },
  icon: {
    color: Colors.placeholder,
    marginHorizontal: Metrics.baseMargin
  }
})
