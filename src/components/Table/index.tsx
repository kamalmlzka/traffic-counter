import React from 'react';
import clsx from 'clsx';
import { VscRefresh } from 'react-icons/vsc';

import { useTableContext } from '@/context/TableContext';
import { ColumnType } from '@/types/ExcelJsType';
import TableBody from '@/components/Table/TableBody';
import saveExcel from '@/libs/saveExcel';

interface TableProps {
  columns: ColumnType[];
}

export default function Table({ columns }: TableProps): JSX.Element {
  const tableHead = columns.map(({ header }) => header);
  const { data, setData } = useTableContext();

  if (data.length === 0) {
    return <section />;
  }

  return (
    <>
      <section className="mx-auto mt-12 flex h-0 w-full justify-end md:w-11/12">
        <button
          title="reset counter"
          type="button"
          className="group btn btn-accent btn-circle z-[15] mr-[.375rem] mt-[.375rem] focus-visible:outline-primary"
          onClick={() => setData((prev) => prev.map((item) => ({ ...item, lv: 0, mhv: 0, hv: 0 })))}
        >
          <VscRefresh className="text-2xl text-accent-content transition duration-700 group-hover:rotate-180" />
        </button>
      </section>

      <section className="mx-auto w-full overflow-x-auto rounded-lg shadow-md shadow-base-content/10 md:w-11/12">
        <table className="table-zebra table w-full">
          <thead>
            <tr className="lg:grid lg:grid-cols-10">
              {tableHead.map((column, index) => (
                <th
                  key={column}
                  className={clsx(
                    'bg-secondary-content text-lg text-secondary',
                    index === 0 && 'col-span-1',
                    index === 1 && 'col-span-3',
                    index > 1 && 'col-span-2 min-w-[8.75rem]'
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <TableBody key={row.no} index={index} item={row} />
            ))}
          </tbody>
        </table>
      </section>

      <section className="mx-auto mt-4 flex w-full justify-end md:w-11/12">
        <button type="button" className="btn btn-primary" onClick={() => saveExcel(columns, data)}>
          <span className="">Export Table</span>
        </button>
      </section>
    </>
  );
}
