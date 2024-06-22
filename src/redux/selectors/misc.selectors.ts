import {createSelector} from 'reselect';
import {IAppState} from '../reducers';

export const getUserConstants = createSelector(
  (state: IAppState) => state.misc,
  ({clothingBrands, clothingSize, preferredColors, outfitSelections}) => ({
    clothingBrands,
    clothingSize,
    preferredColors,
    outfitSelections,
  }),
);
