import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

const shadow = {
  elevation:  Metrics.shadow.elevation,
  shadowColor: Colors.black,
  shadowOpacity: Metrics.shadow.opacity,
  shadowRadius: Metrics.shadow.radius,
  shadowOffset: {
    width: Metrics.shadow.width,
    height: Metrics.shadow.height
  },
  borderTopWidth: 0,
  borderBottomWidth: 0,
  borderRightWidth: 0,
  borderLeftWidth: 0
}

const noBorder = {
  borderLeftWidth: 0, // Remove Border
  borderRightWidth: 0, // Remove Border
  borderTopWidth: 0, // Remove Border
  borderBottomWidth: 0, // Remove Border
}

const ApplicationStyles = {
  imageBackground: {
    flex: 1,
    width: null,
    height: null
  },
  header: {
    backgroundColor: Colors.white,
    paddingLeft: 0,
    paddingRight: 0,
    ...shadow,
  },
  shadow: shadow,
  noBorder: noBorder,
  container: {
    backgroundColor: '#F7F7F7'
  },
  title: {
    ...Fonts.style.h4
  }
}

export default ApplicationStyles;
