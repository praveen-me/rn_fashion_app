import {createSelector} from 'reselect';
import {IAppState} from '../reducers';

export const getIsAuthenticated = createSelector(
  (state: IAppState) => state.user,
  user => user.isAuthenticated,
);

export const getOutfits = createSelector(
  (state: IAppState) => state.user,
  user => user.outfits,
);

export const getUser = createSelector(
  (state: IAppState) => state.user,
  user => user.currentUser,
);

export const getUserNotifications = createSelector(
  (state: IAppState) => state.user,
  user => ({
    discounts: Boolean(user.currentUser?.discounts),
    newStuff: Boolean(user.currentUser?.newStuff),
    outfitIdeas: Boolean(user.currentUser?.outfitIdeas),
    stock: Boolean(user.currentUser?.stock),
  }),
);
