import {
  LOAD_STALL,
} from '../actions/types';

const INITIAL_STATE = {
  images: {},
  info:{}
};
export default function(state = INITIAL_STATE, action) {
	//console.log('called reducer',action);
  switch (action.type) {
    case LOAD_STALL:
	{
		//console.log('initial_payload_swiper',action.payload);
      return action.payload;
	}
    default:
      return state;
  }
}

