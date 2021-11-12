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
