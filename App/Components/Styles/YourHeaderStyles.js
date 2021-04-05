import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, ApplicationStyles} from '../../Themes';

export default StyleSheet.create({
  headerBar: {
    ...ApplicationStyles.shadow,
    backgroundColor: Colors.transparent,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin / 2,
  },
  leftButton: {
    flex: 1,
    paddingLeft: Metrics.baseMargin,
    color: Colors.white
  },
  body: {
    alignItems: 'center',
    flex: 1
  },
  rightButton: {
    flex: 1,
    paddingRight: Metrics.baseMargin
  },
  logoImg: {
    width: Metrics.baseMargin * 4,
    height: Metrics.baseMargin * 4,
  },
  icon: {
    color: Colors.white
  }
})
