import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import DownloaderScreen from '../Containers/Downloader/DownloaderScreen';
import SavedVideoStack from './SavedVideoStack';
import {Dimensions, Platform} from 'react-native';
import TabBar from '../Containers/TabBar.js';

// Manifest of possible screens
const Tabs = createBottomTabNavigator(
  {
    downloaderScreen: DownloaderScreen,
    savedVideoStack: SavedVideoStack,
  },
  {
    initialRouteName: 'downloaderScreen',
    tabBarComponent: TabBar,
  }
)
export default Tabs;
