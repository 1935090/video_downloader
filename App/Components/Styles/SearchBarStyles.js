import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, ApplicationStyles} from '../../Themes';

export default StyleSheet.create({
  header: {
    ...ApplicationStyles.shadow,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginTop: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin
  },
  input: {
    color: Colors.white,
  },
  inputGroup: {
    backgroundColor: '#0F1724',
    marginLeft: 0,
    marginRight: 0
  },
  icon: {
    color: '#9B9B9B'
  },
  rightBtn: {
    color: '#9B9B9B',
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: Metrics.baseMargin / 2,
    marginRight: Metrics.baseMargin / 2,
    fontWeight: 'normal',
  },
  cancelBtn: {
    color: '#9B9B9B',
    paddingLeft: Metrics.baseMargin / 2,
    paddingRight: Metrics.baseMargin / 2,
    fontWeight: 'normal'
  }
})
