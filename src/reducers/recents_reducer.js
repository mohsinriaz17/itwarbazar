import {
   LOAD_RECENTS_ALL,
 LOAD_RECENTS_CAT
} from '../actions/types';

const INITIAL_STATE = {
  images: {},
};
export default function(state = INITIAL_STATE, action) {
	//console.log('called reducer',action);
  switch (action.type) {
    case LOAD_RECENTS_ALL:
	{
		//console.log('initial_payload_swiper',action.payload);
      return action.payload;
	}
	case LOAD_RECENTS_CAT:
	{
		//console.log('initial_payload_swiper',action.payload);
      return action.payload;
	}
    default:
      return state;
  }
}

