import {useState, useEffect} from 'react';

const useTimer = (timerDuration: number) => {
  const [timerExpired, setTimerExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerDuration);

  useEffect(() => {
    let timer: number;
    if (timeLeft > 0) {
      //@ts-ignore
      timer = setTimeout(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }

    if (timeLeft === 0) {
      setTimerExpired(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);

  return {timerExpired, timeLeft};
};

export default useTimer;
