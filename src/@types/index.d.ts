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
  address: string | null;
  outfitSelection: string | null;
  preferredSizes: string[];
  preferredColors: string[];
  preferredBrands: string[];
  name: null | string;
}
