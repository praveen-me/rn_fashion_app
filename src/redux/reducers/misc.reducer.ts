import type {IMiscState} from '../@types';
import {
  GET_CONSTANTS_COMPLETED,
  type IGetConstantsCompleted,
} from '../actions/misc.actions';

const initState: IMiscState = {
  preferredColors: [],
  clothingBrands: [],
  clothingSize: [],
  outfitSelections: [],
};

type RootMiscAction = IGetConstantsCompleted;

export default function miscReducer(
  state = initState,
  action: RootMiscAction,
): IMiscState {
  switch (action.type) {
    case GET_CONSTANTS_COMPLETED: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
