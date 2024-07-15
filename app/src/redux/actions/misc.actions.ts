import type {ProfileConstants, ToggleAppLoaderPayload} from '../@types';

export const GET_CONSTANTS_REQUESTED = 'GET_CONSTANTS_REQUESTED';
export const GET_CONSTANTS_COMPLETED = 'GET_CONSTANTS_COMPLETED';
export const INITIAL_APP_SETUP = 'INITIAL_APP_SETUP';
export const TOGGLE_APP_LOADER = 'TOGGLE_APP_LOADER';

export interface IGetConstantsRequested {
  type: typeof GET_CONSTANTS_REQUESTED;
}

export interface IGetConstantsCompleted {
  type: typeof GET_CONSTANTS_COMPLETED;
  payload: ProfileConstants;
}

export interface IInitialAppSetup {
  type: typeof INITIAL_APP_SETUP;
}

export interface IToggleAppLoader {
  type: typeof TOGGLE_APP_LOADER;
  payload: ToggleAppLoaderPayload;
}

export function getConstantsRequested(): IGetConstantsRequested {
  return {
    type: GET_CONSTANTS_REQUESTED,
  };
}

export function getConstantsCompleted(
  payload: ProfileConstants,
): IGetConstantsCompleted {
  return {
    type: GET_CONSTANTS_COMPLETED,
    payload,
  };
}

export function initialAppSetup(): IInitialAppSetup {
  return {
    type: INITIAL_APP_SETUP,
  };
}

export function toggleAppLoader(
  payload: ToggleAppLoaderPayload,
): IToggleAppLoader {
  return {
    type: TOGGLE_APP_LOADER,
    payload,
  };
}
