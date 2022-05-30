/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Input from '@/components/Form/Input';

interface InputSectionProps {
  inputIds: string[];
  section: 'start' | 'end' | 'interval';
  fractions: ['hour', 'minute', 'second'];
  spanContents: ['h', 'm', 's'];
  inputSectionName: string;
  Node?: (HTMLInputElement | undefined)[];
}

export default function InputSection({
  inputIds,
  section,
  fractions,
  spanContents,
  inputSectionName,
  Node,
}: InputSectionProps): JSX.Element {
  return (
    <section className="form-control w-full">
      <label htmlFor={inputIds[0]} className="label">
        <span className="font-semibold">{inputSectionName}</span>
      </label>
      <div className="grid grid-cols-3 gap-1">
        {inputIds.map((id, index) => (
          <Input
            key={id}
            id={id}
            section={section}
            fraction={fractions[index]}
            spanContent={spanContents[index]}
            nextNode={Node ? Node[index + 2] : undefined}
            prevNode={Node ? Node[index] : undefined}
          />
        ))}
      </div>
    </section>
  );
}

InputSection.defaultProps = { Node: undefined };
