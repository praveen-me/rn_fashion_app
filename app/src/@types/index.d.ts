export interface Response<Data extends Object, T extends string> {
  data: {
    [key in T]: {
      status: {
        error: boolean;
        msg: string;
      };
      result: Data;
    };
  };
}

export interface IAppUser {
  uid: string;
  email: string;
}

export interface IUserData {
  id: string;
  email: string;
  createdAt: string; // Replace 'any' with the appropriate type for createdAt
  address?: string;
  outfitSelection?: string;
  preferredSizes: string[];
  preferredColors: string[];
  preferredBrands: string[];
  name?: string;
  photoURL?: string;
}

export interface IUserNotifications {
  discounts: boolean;
  newStuff: boolean;
  outfitIdeas: boolean;
  stock: boolean;
}

export type ProgressCallbackPayload = {
  progress: number;
  downloadUrl: string | null;
};

export type ProgressCallback = (result: ProgressCallbackPayload) => void;
