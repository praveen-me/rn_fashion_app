export interface IUserState {
  isAuthenticated: boolean;
  currentUser: {};
}

const initState: IUserState = {
  isAuthenticated: false,
  currentUser: {},
};

export default function userReducer(state = initState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
