import React, {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IS_LOGGED_IN} from '../lib/keys';
type LoggedInType = [string, (arg: string) => void] | null;
const isLoggedInContext = createContext<LoggedInType>(null);

export const IsLoggedInProvider = ({children}: {children: Element}) => {
  const state = useState('false');

  useEffect(() => {
    (async () => {
      const value: string | null = await AsyncStorage.getItem(IS_LOGGED_IN);
      state[1](value);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <isLoggedInContext.Provider value={state}>
      {children}
    </isLoggedInContext.Provider>
  );
};

const useIsLoggedIn = () => useContext(isLoggedInContext);

export default useIsLoggedIn;
