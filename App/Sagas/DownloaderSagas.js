import {call, put, select, take, fork, cancel, cancelled} from 'redux-saga/effects'
import { buffers, eventChannel, END } from 'redux-saga';
import DownloaderActions , {DownloaderTypes, downloaderSelectors as Selectors}
  from '../Redux/DownloaderRedux';
import SavedVideoActions from '../Redux/SavedVideoRedux';
import decodeErrMsg from '../Lib/ErrorMessages'
import RNFetchBlob from 'rn-fetch-blob'
import {Platform} from 'react-native';

function createDownloadVideoChannel(videoUri) {
  return eventChannel(emitter => {
    let task = RNFetchBlob.config({
      fileCache : true,
      appendExt : 'mp4',
    })
    .fetch('GET', videoUri, {})
    .progress({interval: 250}, (received, total) => {
      emitter({progress: received / total});
    })
    .then((res) => {
      emitter({success: res.path()});
      emitter(END);
    }).catch((errorMessage, statusCode) => {
      emitter({err: 'Cannot save the video. Please try again later.'});
      emitter(END);
    });
    return () => {
      task.cancel((err) => {alert("cancel")})
    }
  }, buffers.sliding(2));
}

async function fetchVideoPage(url) {
  var htmlContent = '';
  try {
    let response = await fetch(url,
      {headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0'}});

    htmlContent = await response.text();
  } finally {
    return htmlContent;
  }
}

export function* downloaderExtract(action) {
  const {videoPostUrl} = action;
  try {
    yield put(DownloaderActions.extractRequest(videoPostUrl));
    const htmlContent = yield call(fetchVideoPage, videoPostUrl);
    let videoTitle = '';
    let videoDisplayUri = '';

    const titleIdx = htmlContent.indexOf('id="pageTitle"');
    if (titleIdx >= 0) {
      let title = htmlContent.substring(titleIdx + 15);
      videoTitle = title.substring(0, title.indexOf('</title>')).replace('| Facebook', '');
    }

    let hdVideoUri = '';
    const hdSrcIdx = htmlContent.indexOf('hd_src:');
    if (hdSrcIdx >= 0) {
      hdVideoUri = htmlContent.substring(hdSrcIdx + 7);
      hdVideoUri = hdVideoUri.substring(0, hdVideoUri.indexOf(','));
      hdVideoUri = hdVideoUri.replace(/^"(.*)"$/, '$1');
    }

    let sdVideoUri = '';
    let sdSrcIdx = htmlContent.indexOf('sd_src:');
    if (sdSrcIdx >= 0) {
      sdVideoUri = htmlContent.substring(sdSrcIdx + 7);
      sdVideoUri = sdVideoUri.substring(0, sdVideoUri.indexOf(','));
      sdVideoUri = sdVideoUri.replace(/^"(.*)"$/, '$1');
    }

    hdVideoUri = hdVideoUri.indexOf('http') == 0? hdVideoUri : '';
    sdVideoUri = sdVideoUri.indexOf('http') == 0? sdVideoUri : '';

    if (hdVideoUri == '' && sdVideoUri == '') {
      sdSrcIdx = htmlContent.indexOf('contentUrl":"');
      sdVideoUri = htmlContent.substring(sdSrcIdx + 13);
      sdVideoUri = sdVideoUri.substring(0, sdVideoUri.indexOf('"'));
      sdVideoUri = sdVideoUri.replace(/^"(.*)"$/, '$1');
      sdVideoUri = sdVideoUri.toString().replace(/\\/g, '');
    }

    videoDisplayUri = hdVideoUri.length > 0? hdVideoUri : sdVideoUri;
    if (videoDisplayUri.length > 0) {
      yield put(DownloaderActions.extractSuccess(videoTitle, videoDisplayUri, sdVideoUri, hdVideoUri));
    } else {
      yield put(DownloaderActions.extractFailure("Cannot download the video. Please check the entered url or your Internet connection."));
    }
  } catch(error) {
      yield put(DownloaderActions.extractFailure("Cannot download the video. Please check the entered url or your Internet connection."));
  } finally {
    yield put(DownloaderActions.extractFulfill());
  }
}

export function* downloaderSave(action) {
  const {savingType} = action;
  yield put(DownloaderActions.saveRequest(savingType));

  const videoUri = (savingType == 'hd') ? yield select(Selectors.selectHdVideoUri)
    : yield select(Selectors.selectSdVideoUri);
  const videoPostUrl = yield select(Selectors.selectVideoPostUrl);
  const videoTitle = yield select(Selectors.selectVideoTitle);

  const channel = yield call(createDownloadVideoChannel, videoUri);
  while (true) {
    const {progress = 0, err, success} = yield take(channel);
    if (err) {
      yield put(DownloaderActions.saveFailure("Cannot save the video. Please try again later."));
      yield put(DownloaderActions.saveFulfill());
      return;
    }

    if (success) {
      let filepath = success;
      const filename = filepath.substring(filepath.lastIndexOf('/') + 1);
      let item = {path: filepath, name: videoTitle, quality: savingType,
        url: videoPostUrl, id: filename};
      yield put(SavedVideoActions.save(item));
      yield put(DownloaderActions.saveSuccess());

      yield put(DownloaderActions.saveFulfill());
      return;
    }
    yield put(DownloaderActions.saveProgress(progress));
  }
}

export function* cancelTasks(tasks) {
  for (var idx in tasks) {
    if (tasks[idx]) yield cancel(tasks[idx]);
  };
}

export function* downloaderSaga() {
  while(true) {
    let extractTask, saveTask, prevActionName;
    let action = yield take([DownloaderTypes.EXTRACT_TRIGGER,
      DownloaderTypes.SAVE_TRIGGER]);

    if (action.type == DownloaderTypes.EXTRACT_TRIGGER) {
      yield call(cancelTasks, [extractTask, saveTask]);
      extractTask = yield fork(downloaderExtract, action);
    } else if (action.type == DownloaderTypes.SAVE_TRIGGER) {
      yield call(cancelTasks, [extractTask, saveTask]);
      saveTask = yield fork(downloaderSave, action);
    }

    prevActionName = action.type;
  }
}
