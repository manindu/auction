import { useState, useEffect } from 'react';

const useInterval = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    timeElapsed,
  };
};

export default useInterval;
