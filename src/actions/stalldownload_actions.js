import firebase from 'firebase';

import {
 LOAD_STALL
} from './types';

export const loadstall = (path) => {
	console.log('called action');
  return (dispatch) => {
    firebase.database().ref(`/G9/Stalls/${path}`)
      .once('value', snapshot => {
		  //console.log('snap:',snapshot);
		  //console.log('snap val:',snapshot.val());
        dispatch({ type: LOAD_STALL, payload: snapshot.val() });
      });
  };
};

