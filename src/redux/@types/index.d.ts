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
