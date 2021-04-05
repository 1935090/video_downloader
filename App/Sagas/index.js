import {fork, takeLatest, takeEvery, all} from 'redux-saga/effects'
import { persistReducer } from 'redux-persist'
import {downloaderSaga} from './DownloaderSagas';

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
/* ------------- Connect SampleQuestionTypes To Sagas ------------- */
export default function * root() {
  yield all([
    fork(downloaderSaga),
  ])
}
