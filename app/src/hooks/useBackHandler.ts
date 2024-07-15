import {useEffect, useRef} from 'react';
import {BackHandler} from 'react-native';

type BackHandlerCallback = () => boolean;

const useBackHandler = (
  callback: BackHandlerCallback,
  deps: React.DependencyList = [],
  enabled: boolean = true,
) => {
  const isEnabled = useRef<boolean>(enabled);

  useEffect(() => {
    isEnabled.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const handleBackPress = (): boolean => {
      if (isEnabled.current) {
        return callback();
      }
      return false; // Returning false allows the default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
  }, [callback, ...deps]);
};

export default useBackHandler;
