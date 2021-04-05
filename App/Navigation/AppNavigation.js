import {createStackNavigator, createAppContainer} from 'react-navigation';
import DrawerNavigation from './DrawerNavigation';

const PrimaryNav = createStackNavigator(
  {
    drawerStack: {screen: DrawerNavigation}
  },
  {
    headerMode: 'none',
    initialRouteName: 'drawerStack',
  }
);

export default createAppContainer(PrimaryNav);
