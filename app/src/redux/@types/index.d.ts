import type {FirebaseAuthTypes} from '@react-native-firebase/auth';
import type {IUserData, IUserNotifications} from '../../@types';

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
  currentUser: (IUserData & IUserNotifications) | null;
  outfits: {id: string; url: string}[];
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
  loaderConfig: {
    state: boolean;
    message: string;
  };
}

export type ProfileConstants = Pick<
  IMiscState,
  'outfitSelections' | 'clothingBrands' | 'preferredColors' | 'clothingSize'
>;

export type ToggleAppLoaderPayload = {
  state: boolean;
  message: string;
};
