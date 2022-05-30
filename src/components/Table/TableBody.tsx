import React from 'react';
import clsx from 'clsx';

import { RowType } from '@/types/ExcelJsType';
import TableData from '@/components/Table/TableData';

interface TableBodyProps {
  index: number;
  item: RowType;
}

export default function TableBody({ index, item }: TableBodyProps): JSX.Element {
  return (
    <tr className="lg:grid lg:grid-cols-10">
      {Object.entries(item).map(([key, value], i) =>
        i <= 1 ? (
          <th
            key={key}
            className={clsx(
              i === 0 && 'col-span-1',
              i === 1 &&
                'col-span-3 whitespace-normal text-center md:whitespace-nowrap md:text-left'
            )}
          >
            {value}
          </th>
        ) : (
          <TableData key={key} colKey={key as 'lv' | 'mhv' | 'hv'} rowIndex={index} />
        )
      )}
    </tr>
  );
}
