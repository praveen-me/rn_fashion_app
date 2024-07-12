import type {IMiscState} from '../@types';
import {
  GET_CONSTANTS_COMPLETED,
  TOGGLE_APP_LOADER,
  type IGetConstantsCompleted,
  type IToggleAppLoader,
} from '../actions/misc.actions';

const initState: IMiscState = {
  preferredColors: [],
  clothingBrands: [],
  clothingSize: [],
  outfitSelections: [],
  loaderConfig: {
    state: false,
    message: '',
  },
};

type RootMiscAction = IGetConstantsCompleted | IToggleAppLoader;

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

    case TOGGLE_APP_LOADER: {
      return {
        ...state,
        loaderConfig: {
          ...state.loaderConfig,
          state: action.payload.state,
          message: action.payload.message,
        },
      };
    }

    default:
      return state;
  }
}
