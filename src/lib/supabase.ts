import 'react-native-url-polyfill/auto';

import {
  createClient,
  SupabaseClient,
  type AuthResponse,
  type AuthTokenResponsePassword,
} from '@supabase/supabase-js';
import EncryptedStorage from 'react-native-encrypted-storage';

import {SUPABASE_ANON_KEY, SUPABASE_URL} from '@env';

// export interface ISbClient {
//   init(): void;
//   signInUser(credentials: {
//     email: string;
//     password: string;
//   }): Promise<AuthTokenResponsePassword | null>;
//   createUser(credentials: {
//     email: string;
//     password: string;
//   }): Promise<AuthResponse | null>;
// }

export class SbClient {
  private client: SupabaseClient | null = null;

  init() {
    console.log(SUPABASE_ANON_KEY, SUPABASE_URL);

    if (SUPABASE_ANON_KEY && SUPABASE_URL) {
      try {
        this.client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: {
            storage: EncryptedStorage,
            persistSession: true,
            detectSessionInUrl: false,
            autoRefreshToken: true,
          },
        });
      } catch (e) {
        console.log(e, 'error');
        throw new Error('Supabase client is not initialized.');
      }
    } else {
      throw new Error(
        'Supabase credentials are not properly set in environment.',
      );
    }
  }

  signInUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthTokenResponsePassword | null> => {
    if (!this.client) {
      throw new Error('Supabase client is not initialized.');
    }

    try {
      const {data, error} = await this.client.auth.signInWithPassword({
        email,
        password,
      });

      console.log({data, error});

      if (data) {
        this.getOutfits();
      }

      if (error) throw new Error(error.message);

      return {data, error: null};
    } catch (error: any) {
      return {data: {user: null, session: null}, error};
    }
  };

  createUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResponse | null> => {
    if (!this.client) {
      throw new Error('Supabase client is not initialized.');
    }

    try {
      const {data, error} = await this.client.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {data, error: null};
    } catch (error: any) {
      return {data: {user: null, session: null}, error};
    }
  };

  getOutfits = async () => {
    if (!this.client) {
      throw new Error('Supabase client is not initialized.');
    }

    try {
      const {data, error} = await this.client.from('files').select('*');

      if (error) {
        throw new Error(error.message);
      }

      return {data, error: null};
    } catch (error: any) {
      return {data: {user: null, session: null}, error};
    }
  };

  getUserBySession = async (session: string) => {
    if (!this.client) {
      throw new Error('Supabase client is not initialized.');
    }

    try {
      // Supabase: get user by session
      const {data, error} = await this.client.auth.getUser(session);

      if (error) {
        throw new Error(error.message);
      }

      return {data, error: null};
    } catch (error: any) {
      return {data: {user: null, session: null}, error};
    }
  };
}

const supabase = new SbClient();

export default supabase;
