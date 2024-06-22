import type {IMiscState} from '../@types';

export const GET_CONSTANTS_REQUESTED = 'GET_CONSTANTS_REQUESTED';
export const GET_CONSTANTS_COMPLETED = 'GET_CONSTANTS_COMPLETED';

export interface IGetConstantsRequested {
  type: typeof GET_CONSTANTS_REQUESTED;
}

export interface IGetConstantsCompleted {
  type: typeof GET_CONSTANTS_COMPLETED;
  payload: IMiscState;
}

export function getConstantsRequested(): IGetConstantsRequested {
  return {
    type: GET_CONSTANTS_REQUESTED,
  };
}

export function getConstantsCompleted(
  payload: IMiscState,
): IGetConstantsCompleted {
  return {
    type: GET_CONSTANTS_COMPLETED,
    payload,
  };
}
