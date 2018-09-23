import { combineReducers } from 'redux';
import upload from './upload_reducer';
import stalldownload from './stalldownload_reducer';
import recents from './recents_reducer';

export default combineReducers({
  upload, stalldownload, recents
});
