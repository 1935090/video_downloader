import {createDrawerNavigator, createAppContainer, createStackNavigator}
  from 'react-navigation';

import SavedVideoScreen from '../Containers/SavedVideo/SavedVideoScreen';

const SavedVideoStack = createStackNavigator(
  {
    savedVideoScreen: SavedVideoScreen,
  },
  {
    headerMode: "none",
    initialRouteName: 'savedVideoScreen',
  }
)

export default SavedVideoStack;
