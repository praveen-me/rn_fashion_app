import {useState, useEffect} from 'react';

type UseTimeConfig = {
  shouldStart?: boolean;
};

const useTimer = (timerDuration: number, config: UseTimeConfig) => {
  const [timerExpired, setTimerExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerDuration);

  const {shouldStart = false} = config;

  useEffect(() => {
    if (!shouldStart) {
      if (timerExpired) {
        setTimerExpired(false);
        setTimeLeft(timerDuration);
      }
      return;
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (timeLeft === 0) {
      setTimerExpired(true);
    }
  }, [timeLeft, shouldStart, timerExpired, timerDuration]);

  return {timerExpired, timeLeft};
};

export default useTimer;
