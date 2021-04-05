import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import IcomoonConfig from "../../resources/fonts/selection.json";
import styles from './Styles/IcomoonStyles';
import {Platform} from 'react-native';

const isIOS = Platform.OS === 'ios';

export default Icomoon = isIOS? createIconSetFromIcoMoon(IcomoonConfig,
  'icomoon', 'icomoon.tff') : createIconSetFromIcoMoon(IcomoonConfig, 'icomoon');
