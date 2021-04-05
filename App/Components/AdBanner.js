import React, {Component} from 'react';
import DeviceInfo from 'react-native-device-info';
import {AdMobBanner} from 'react-native-admob';
import AdMob from '../Constants/AdMob';

export default class AdBanner extends Component {
  constructor(props) {
    super(props);
    this.deviceId = DeviceInfo.getUniqueID();
  }

  render() {
    return (<AdMobBanner
      adSize="fullBanner"
      adUnitID={AdMob.BANNER_AD_UNIT_ID}
      testDevices={[this.deviceId]}
      onAdFailedToLoad={error => {}}
    />);
  }
}
