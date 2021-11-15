import {createSelector} from 'reselect';
import {IAppState} from '../reducers';

export const getIsAuthenticated = createSelector<
  IAppState,
  IAppState['user'],
  boolean
>(
  (state) => state.user,
  (user) => user.isAuthenticated,
);
