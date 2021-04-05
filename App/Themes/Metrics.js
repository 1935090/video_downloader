import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const metrics = {
  baseMargin: 12,
  doubleBaseMargin: 24,
  borderWidth: 2.5,
  smallMargin: 5,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
    showcase: 300,
  },
  shadow: {
    width: 0,
    height: 5,
    opacity: 0.05,
    radius: 7,
    elevation: isIOS? 50 : 0
  },
  inputHeight: 50
}

export default metrics;
