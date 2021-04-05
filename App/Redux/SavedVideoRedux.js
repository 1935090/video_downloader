import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {Toast} from 'native-base';
const RNFS = require('react-native-fs');

/* ------------- Types and Action Creators ------------- */
export const {Types, Creators} = createActions({
  save: ['item'],
  remove: ['itemId'],
  search: ['searchStr']
}, {prefix: 'BOOKMARK_'})

export const BookmarkTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  searchStr: '',
  items: [],
  itemIds: {}
})

/* ------------ Startup reducers ----------- */
const save = (state, action) => {
  const item = action['item'];
  const itemIds = {...state.itemIds};
  const items = [...state.items];
  if (!itemIds.hasOwnProperty(item.id)) {
    items.push(item);
    itemIds[item.id] = true;
  }
  return state.merge({itemIds, items});
}

const remove = (state, action) => {
  const id = action['itemId'];
  const itemIds = {...state.itemIds};
  const item = [...state.items].filter(item => item.id == id)[0];
  try {
    const filePath = item.path;
    RNFS.unlink(filePath)
    .then(() => {
      try {
        RNFS.scanFile(filePath).then(() => {}).catch(err => {});
      } catch (error) {};

      Toast.show({text: "Deleted successfully the video.", buttonText: 'Okay',
        type: 'default', duration: 1000});
    })
    .catch((err) => {
      Toast.show({text: "Error occurred during deleting the video. Try again later.",
        buttonText: 'Okay', type: 'default', duration: 1000});
    })

    delete itemIds[id];
    var items = [...state.items].filter(item => item.id != id);
    return state.merge({itemIds, items});
  } catch(error) {
    Toast.show({text: "Error occurred during deleting the video. Try again later.",
      buttonText: 'Okay', type: 'default', duration: 1000});
    return state;
  }
}

const search = (state, action) => {
  const {searchStr} = action;
  return state.merge({searchStr});
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE]: save,
  [Types.REMOVE]: remove,
  [Types.SEARCH]: search,
});
