import firebase from 'firebase';

import {
 LOAD_RECENTS_ALL,
 LOAD_RECENTS_CAT
} from './types';

export const loadrecentsall = () => {
	//console.log('called action');
  return (dispatch) => {
    firebase.database().ref(`/G9/Recents/All`)
      .once('value', snapshot => {
		  //console.log('snap:',snapshot);
		 // console.log('snap val:',snapshot.val());
        dispatch({ type: LOAD_RECENTS_ALL, payload: snapshot.val() });
      });
  };
};

export const loadrecentscat = (cat) => {
	console.log('called action');
  return (dispatch) => {
    firebase.database().ref(`/G9/Stalls/${cat}`)
      .once('value', snapshot => {
		  //console.log('snap:',snapshot);
		  //console.log('snap val:',snapshot.val());
        dispatch({ type: LOAD_RECENTS_CAT, payload: snapshot.val() });
      });
  };
};
