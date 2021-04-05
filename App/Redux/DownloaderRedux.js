import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {Toast} from 'native-base';
import {Dimensions} from 'react-native';
const RNFS = require('react-native-fs');

/* ------------- Types and Action Creators ------------- */
export const {Types, Creators} = createActions({
  extractTrigger: ['videoPostUrl'],
  extractRequest: ['videoPostUrl'],
  extractSuccess: ['videoTitle', 'videoDisplayUri', 'sdVideoUri', 'hdVideoUri'],
  extractFailure: ['errorMsg'],
  extractFulfill: null,

  saveTrigger: ['savingType'],
  saveRequest: ['savingType'],
  saveProgress: ['savingProgress'],
  saveSuccess: null,
  saveFailure: ['errorMsg'],
  saveFulfill: null,
  updateOrientationSize: ['width', 'height']
}, {prefix: 'DOWNLOADER_'})

export const DownloaderTypes = Types
export default Creators

let {width} = Dimensions.get('window');
/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  orientationWidth: 1,
  orientationHeight: 1,
  videoPostUrl: '',
  extracting: false,
  videoTitle: '',
  videoDisplayUri: '',
  sdVideoUri: '',
  hdVideoUri: '',
  saving: false,
  savingType: '',
  savingProgress: 0,
  sdVideoSaved: false,
  hdVideoSaved: false,
});

export const downloaderSelectors = {
  selectHdVideoUri: state => state.downloader.hdVideoUri,
  selectSdVideoUri: state => state.downloader.sdVideoUri,
  selectVideoPostUrl: state => state.downloader.videoPostUrl,
  selectVideoTitle: state => state.downloader.videoTitle,
}
/* ------------ Startup reducers ----------- */
const extractRequest = (state, action) => {
  const {videoPostUrl} = action;
  return state.merge({...INITIAL_STATE, extracting: true, videoPostUrl});
}

const extractSuccess = (state, action) => {
  const {videoTitle, videoDisplayUri, sdVideoUri, hdVideoUri} = action;
  let hdVideoSaved = hdVideoUri == '';
  let sdVideoSaved = sdVideoUri == '';
  return state.merge({extracting: false, videoTitle, videoDisplayUri,
    sdVideoUri, hdVideoUri, hdVideoSaved, sdVideoSaved});
}

const extractFailure = (state, action) => {
  const {errorMsg} = action;
  if (errorMsg) {
    Toast.show({text: errorMsg, buttonText: 'Okay', type: 'default', duration: 5000});
  }
  return state;
}
const extractFulfill = (state, action) => {
  return state.merge({extracting: false});
}

const saveRequest = (state, action) => {
  const {savingType} = action;
  return state.merge({savingType, saving: true});
}

const saveProgress = (state, action) => {
  const {savingProgress} = action;
  return state.merge({savingProgress});
}

const saveSuccess = (state, action) => {
  Toast.show({text: "The video has been successfully saved.",
    buttonText: 'Okay', type: 'default', duration: 5000});
  if (state.savingType == 'hd') {
    return state.merge({saving: false, hdVideoSaved: true});
  } else if (state.savingType == 'sd') {
    return state.merge({saving: false, sdVideoSaved: true});
  }
  return state;
}

const saveFailure = (state, action) => {
  const {errorMsg} = action;
  if (errorMsg) {
    Toast.show({text: errorMsg, buttonText: 'Okay', type: 'default', duration: 2000});
  }
  return state;
}

const saveFulfill = (state, action) => {
  return state.merge({saving: false, savingProgress: 0});
}
const updateOrientationSize = (state, action) => {
  const {width, height} = action;
  return state.merge({orientationWidth: width, orientationHeight: height});
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXTRACT_REQUEST]: extractRequest,
  [Types.EXTRACT_SUCCESS]: extractSuccess,
  [Types.EXTRACT_FAILURE]: extractFailure,
  [Types.EXTRACT_FULFILL]: extractFulfill,

  [Types.SAVE_REQUEST]: saveRequest,
  [Types.SAVE_PROGRESS]: saveProgress,
  [Types.SAVE_SUCCESS]: saveSuccess,
  [Types.SAVE_FAILURE]: saveFailure,
  [Types.SAVE_FULFILL]: saveFulfill,
  [Types.UPDATE_ORIENTATION_SIZE]: updateOrientationSize,
});
