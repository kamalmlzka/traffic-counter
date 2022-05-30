import React from 'react';
import { useTimeDataContext } from '@/context/TimeDataContext';

interface InputProps {
  id: string;
  section: 'start' | 'end' | 'interval';
  fraction: 'hour' | 'minute' | 'second';
  spanContent: 'h' | 'm' | 's';
  nextNode?: HTMLInputElement | undefined;
  prevNode?: HTMLInputElement | undefined;
}

export default function Input({
  id,
  section,
  fraction,
  spanContent,
  nextNode,
  prevNode,
}: InputProps): JSX.Element {
  const { timeData, setTimeData } = useTimeDataContext();

  const [inputValue, setInputValue] = React.useState<string>(
    timeData[section][fraction] ? String(timeData[section][fraction]).padStart(2, '0') : '00'
  );

  return (
    <label htmlFor={id} className="input-group" key={id}>
      <input
        id={id}
        type="number"
        className="input input-bordered text-center"
        value={inputValue}
        onChange={({ target: { value } }) => {
          if (+value < (fraction === 'hour' ? 24 : 60) && +value >= 0) setInputValue(value);
          else setInputValue((prev) => prev);

          if (value.length === 2 || +value > (fraction === 'hour' ? 2 : 5)) {
            if (nextNode) nextNode.focus();
            setTimeData((prev) => ({
              ...prev,
              [section]: { ...prev[section], [fraction]: +value },
            }));
          }

          if (value.length > 2) {
            setInputValue((prev) => prev.slice(-2));
            if (nextNode) nextNode.focus();
          }
        }}
        onKeyDown={(e) => {
          if (['e', '+', '-'].includes(e.key)) e.preventDefault();
          else if (['Backspace', 'Delete'].includes(e.key)) {
            e.preventDefault();
            setInputValue('');
            setTimeData((prev) => ({
              ...prev,
              [section]: { ...prev[section], [fraction]: 0 },
            }));
          } else if (['ArrowRight'].includes(e.key)) {
            e.preventDefault();
            if (nextNode) nextNode.focus();
          } else if (['ArrowLeft'].includes(e.key)) {
            e.preventDefault();
            if (prevNode) prevNode.focus();
          }
        }}
        onFocus={(e) => e.target.select()}
        onBlur={({ target: { value } }) => {
          if (+value < (fraction === 'hour' ? 24 : 60) && +value >= 0) {
            setInputValue(value.padStart(2, '0'));
          } else {
            setInputValue((prev) => prev.padStart(2, '0'));
            return;
          }

          if (value.length > 2) setInputValue(value.slice(-2));
          setTimeData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [fraction]: +value },
          }));
        }}
      />
      <span title={fraction}>{spanContent}</span>
    </label>
  );
}

Input.defaultProps = { nextNode: undefined, prevNode: undefined };
