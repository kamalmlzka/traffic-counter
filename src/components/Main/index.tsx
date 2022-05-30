import React from 'react';

import Form from '@/components/Form';
import Table from '@/components/Table';

import useLocalStorage from '@/hooks/useLocalStorage';

import { TimeDataContextProvider } from '@/context/TimeDataContext';
import { TableContextProvider } from '@/context/TableContext';

import { ColumnType } from '@/types/ExcelJsType';

const COLUMN_TRAFFIC_COUNTING: ColumnType[] = [
  { header: 'No', key: 'no' },
  { header: 'Jam', key: 'jam' },
  { header: 'LV', key: 'lv' },
  { header: 'MHV', key: 'mhv' },
  { header: 'HV', key: 'hv' },
];

const COLUMN_SPEED_SURVEY: ColumnType[] = [
  { header: 'No', key: 'no' },
  { header: 'Waktu', key: 'waktu' },
  { header: 'LV 1', key: 'lv1' },
  { header: 'LV 2', key: 'lv2' },
  { header: 'LV 3', key: 'lv3' },
  { header: 'MHV 1', key: 'mhv1' },
  { header: 'MHV 2', key: 'mhv2' },
  { header: 'MHV 3', key: 'mhv3' },
  { header: 'HV 1', key: 'hv1' },
  { header: 'HV 2', key: 'hv2' },
  { header: 'HV 3', key: 'hv3' },
];

export default function Main(): JSX.Element {
  const [timeRanges, setTimeRanges] = useLocalStorage<string[]>('time-range', []);
  return (
    <main className="p-10">
      <TimeDataContextProvider>
        <Form setData={setTimeRanges} />
      </TimeDataContextProvider>

      <TableContextProvider timeRanges={timeRanges}>
        <Table columns={COLUMN_TRAFFIC_COUNTING} />
      </TableContextProvider>
    </main>
  );
}
