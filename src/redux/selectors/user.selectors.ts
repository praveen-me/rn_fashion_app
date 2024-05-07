import {createSelector} from 'reselect';
import {IAppState} from '../reducers';

export const getIsAuthenticated = createSelector(
  (state: IAppState) => state.user,
  (user) => user.isAuthenticated,
);
