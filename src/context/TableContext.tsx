/* eslint-disable no-extend-native */
import React from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';
import { RowType } from '@/types/ExcelJsType';

interface TableContextProps {
  children: React.ReactNode;
  timeRanges: string[];
}

interface TableContextType {
  data: RowType[];
  setData: React.Dispatch<React.SetStateAction<RowType[]>>;
}

const TableContext = React.createContext<TableContextType>({ data: [], setData: () => {} });

export function TableContextProvider({ children, timeRanges }: TableContextProps): JSX.Element {
  const mapToRowType = React.useCallback(
    (data: string[]): RowType[] =>
      data.map((item, index) => ({
        no: index + 1,
        jam: item,
        lv: 0,
        mhv: 0,
        hv: 0,
      })),
    [timeRanges]
  );

  const [dataMapped, setDataMapped] = useLocalStorage<RowType[]>('data', mapToRowType(timeRanges));

  React.useEffect(() => {
    let isSame: boolean = true;
    if (dataMapped.length !== timeRanges.length) isSame = false;
    else {
      for (let i = 0; i < dataMapped.length; i += 1) {
        if (dataMapped[i].jam !== timeRanges[i]) {
          isSame = false;
          break;
        }
      }
    }

    if (dataMapped.length) {
      let isSameKeys: boolean = true;
      Object.keys(dataMapped[0]).forEach((key, index) => {
        if (key !== Object.keys(mapToRowType([''])[0])[index]) isSameKeys = false;
      });
      if (!isSameKeys) isSame = false;
    }

    if (!isSame) {
      setDataMapped(mapToRowType(timeRanges));
    }
  }, [timeRanges]);

  const contextVal = React.useMemo(
    () => ({ data: dataMapped, setData: setDataMapped }),
    [dataMapped]
  );

  return <TableContext.Provider value={contextVal}>{children}</TableContext.Provider>;
}

export const useTableContext = () => React.useContext(TableContext);
