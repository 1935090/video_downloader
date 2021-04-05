import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import SideBar from '../Containers/SideBar.js';
import {Dimensions, Platform} from 'react-native';
import Tabs from '../Navigation/Tabs';
// import AuthStack from '../Navigation/AuthStack';
import Colors from '../Themes/Colors';

const DrawerNavigation = createDrawerNavigator(
  {
    tabs: Tabs,
  },
  {
    initialRouteName: 'tabs',
    overlayColor: 'rgba(0, 0, 0, 0.4)',
    contentComponent: SideBar,
    drawerPosition: 'left',
    drawerBackgroundColor: Colors.white,
    drawerWidth:
      Dimensions.get('window').width - (Platform.OS === 'android' ? 100 : 100),
  }
)

export default DrawerNavigation;
