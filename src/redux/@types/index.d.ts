import type {IUserData} from '../../@types';

export interface IFetchMeUser {
  user_id: string;
  email: string;
  name: string;
}

export interface ISession {
  expires_at: number;
  refreshToken: string;
  accessToken: string;
}

export interface IUserState {
  isAuthenticated: boolean;
  currentUser: IUserData | null;
  outfits: {id: number; url: string}[];
}

export interface IMiscState {
  preferredColors: {
    value: string;
  }[];
  clothingSize: {
    value: string;
  }[];
  clothingBrands: {
    key: string;
    label: string;
  }[];
  outfitSelections: {
    key: string;
    label: string;
  }[];
}

export type ProfileConstants = Pick<
  IMiscState,
  'outfitSelections' | 'clothingBrands' | 'preferredColors' | 'clothingSize'
>;
