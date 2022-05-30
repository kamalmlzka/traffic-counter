import React from 'react';

import { useTableContext } from '@/context/TableContext';

interface TableDataProps {
  rowIndex: number;
  colKey: 'lv' | 'mhv' | 'hv';
}

export default function TableData({ rowIndex, colKey }: TableDataProps): JSX.Element {
  const { data, setData } = useTableContext();

  return (
    <td className="col-span-2">
      <div className="flex items-center justify-between">
        <span className="tooltip" data-tip={colKey.toUpperCase()}>
          {data[rowIndex][colKey]}
        </span>
        <div className="mr-4">
          <button
            title="decrement"
            type="button"
            className="btn btn-circle btn-sm mr-1"
            onClick={() => {
              setData((prev) => {
                const newData = JSON.parse(JSON.stringify(prev));
                if (newData[rowIndex][colKey] > 0) {
                  newData[rowIndex][colKey] -= 1;
                }
                return newData;
              });
            }}
          >
            -
          </button>
          <button
            title="increment"
            type="button"
            className="btn btn-circle btn-sm"
            onClick={() => {
              setData((prev) => {
                const newData = JSON.parse(JSON.stringify(prev));
                newData[rowIndex][colKey] += 1;
                return newData;
              });
            }}
          >
            +
          </button>
        </div>
      </div>
    </td>
  );
}
