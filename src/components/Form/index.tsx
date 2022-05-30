/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */
import React, { useState } from 'react';

import InputSection from '@/components/Form/InputSection';
import { useTimeDataContext } from '@/context/TimeDataContext';
import makeTimeInterval from '@/libs/makeTimeInterval';

interface FormProps {
  setData: React.Dispatch<React.SetStateAction<string[]>>;
}

// id constant
const START_ID_HOUR = 'start-hour';
const START_ID_MINUTE = 'start-minute';
const START_ID_SECOND = 'start-second';
const END_ID_HOUR = 'end-hour';
const END_ID_MINUTE = 'end-minute';
const END_ID_SECOND = 'end-second';
const INTERVAL_ID_HOUR = 'interval-hour';
const INTERVAL_ID_MINUTE = 'interval-minute';
const INTERVAL_ID_SECOND = 'interval-second';

// collection of ids
const START_ID = [START_ID_HOUR, START_ID_MINUTE, START_ID_SECOND];
const END_ID = [END_ID_HOUR, END_ID_MINUTE, END_ID_SECOND];
const INTERVAL_ID = [INTERVAL_ID_HOUR, INTERVAL_ID_MINUTE, INTERVAL_ID_SECOND];

// span content
const SPAN_CONTENT: ['h', 'm', 's'] = ['h', 'm', 's'];

// time constant
const FRACTIONS: ['hour', 'minute', 'second'] = ['hour', 'minute', 'second'];

const sliceNodeList = (
  nodeList: NodeListOf<HTMLInputElement>,
  start: number,
  end?: number | undefined
): HTMLInputElement[] => Array.from(nodeList).slice(start, end);

export default function Form({ setData }: FormProps): JSX.Element {
  const { timeData } = useTimeDataContext();
  const [error, setError] = useState<{ isError: boolean; message: string }>({
    isError: false,
    message: '',
  });

  const [inputEls, setInputEls] = useState<NodeListOf<HTMLInputElement>>();

  React.useEffect(() => {
    setInputEls(document.querySelectorAll('input[type=number]'));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.querySelector<HTMLButtonElement>('#submit')?.focus();
    try {
      const data = makeTimeInterval(timeData);
      setData(data);
      setError({ isError: false, message: '' });
    } catch (err) {
      if (err instanceof Error) {
        setError({ isError: true, message: err.message });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-x-20 gap-y-8 md:grid-cols-2 lg:mx-auto lg:w-4/5"
    >
      {['Start Survey Time', 'End Survey Time', 'Interval Time'].map((title, index, arr) => (
        <InputSection
          key={title}
          inputSectionName={title}
          section={Object.keys(timeData)[index] as 'start' | 'end' | 'interval'}
          inputIds={[START_ID, END_ID, INTERVAL_ID][index]}
          fractions={FRACTIONS}
          spanContents={SPAN_CONTENT}
          Node={(() => {
            if (inputEls) {
              if (index === 0) {
                return [undefined, ...sliceNodeList(inputEls, 0)];
              }
              return sliceNodeList(inputEls, index * arr.length - 1);
            }
            return undefined;
          })()}
        />
      ))}

      {error.isError && (
        <section className="flex items-end justify-end md:col-span-2">
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error.message}</span>
            </div>
          </div>
        </section>
      )}

      <section className="flex justify-end pt-10 md:col-span-2 md:pt-2">
        <button id="submit" className="btn btn-primary" type="submit">
          Create Table
        </button>
      </section>
    </form>
  );
}
