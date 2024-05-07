import {createSelector} from 'reselect';
import {IAppState} from '../reducers';

export const getIsAuthenticated = createSelector(
  (state: IAppState) => state.user,
  (user) => user.isAuthenticated,
);


export const getOutfits = createSelector(
  (state: IAppState) => state.user,
  (user) => user.outfits,
);