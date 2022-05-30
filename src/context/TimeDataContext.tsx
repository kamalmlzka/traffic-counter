import React from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';
import { TimeData, Time } from '@/types/TimeDataType';

interface TimeDataProviderProps {
  children: React.ReactNode;
}

interface TimeDataContextType {
  timeData: TimeData;
  setTimeData: React.Dispatch<React.SetStateAction<TimeData>>;
}

const TIME: Time = {
  hour: 0,
  minute: 0,
  second: 0,
};

const TIME_DATA = { start: TIME, end: TIME, interval: TIME };

const TimeDataContext = React.createContext<TimeDataContextType>({
  timeData: TIME_DATA,
  setTimeData: () => {},
});

export function TimeDataContextProvider({ children }: TimeDataProviderProps): JSX.Element {
  const [timeData, setTimeData] = useLocalStorage<TimeData>('time-data', TIME_DATA);

  const contextVal = React.useMemo(() => ({ timeData, setTimeData }), [timeData]);

  return <TimeDataContext.Provider value={contextVal}>{children}</TimeDataContext.Provider>;
}

export const useTimeDataContext = () => React.useContext(TimeDataContext);
