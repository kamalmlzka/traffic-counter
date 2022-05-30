/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';

type Time = {
  hour: number;
  minute: number;
  second: number;
};

interface TimeData {
  start: Time;
  end: Time;
  interval: Time;
}

function validateInput(timeData: TimeData) {
  // initialize dayjs
  dayjs.extend(objectSupport);
  dayjs.extend(duration);

  if (timeData.start.hour > 23 || timeData.start.hour < 0) {
    throw new Error('Start time hour must be between 0 and 23');
  }

  if (timeData.start.minute > 59 || timeData.start.minute < 0) {
    throw new Error('Start time minute must be between 0 and 59');
  }

  if (timeData.start.second > 59 || timeData.start.second < 0) {
    throw new Error('Start time second must be between 0 and 59');
  }

  if (timeData.end.hour > 23 || timeData.end.hour < 0) {
    throw new Error('End Time hour must be between 0 and 23');
  }

  if (timeData.end.minute > 59 || timeData.end.minute < 0) {
    throw new Error('End Time minute must be between 0 and 59');
  }

  if (timeData.end.second > 59 || timeData.end.second < 0) {
    throw new Error('End Time second must be between 0 and 59');
  }

  if (timeData.interval.hour > 23 || timeData.interval.hour < 0) {
    throw new Error('Interval hour must be between 0 and 23');
  }

  if (timeData.interval.minute > 59 || timeData.interval.minute < 0) {
    throw new Error('Interval minute must be between 0 and 59');
  }

  if (timeData.interval.second > 59 || timeData.interval.second < 0) {
    throw new Error('Interval second must be between 0 and 59');
  }

  // @ts-ignore
  const start = dayjs(timeData.start); // @ts-ignore
  const end = dayjs(timeData.end); // @ts-ignore
  const interval = dayjs.duration(timeData.interval).asMilliseconds();

  // start and end time most not be equal
  if (start.isSame(end)) {
    throw new Error('Start time and end time must not be equal');
  }

  // interval must not be zero
  if (interval <= 0) {
    throw new Error('Interval must not be zero');
  }
}

export default function makeTimeInterval(timeData: TimeData): string[] {
  // validate user input
  validateInput(timeData);

  // initialize array of strings
  const arrayOfTime: string[] = [];

  // initialize dayjs
  dayjs.extend(objectSupport);
  dayjs.extend(isBetween);
  dayjs.extend(duration);

  // @ts-ignore
  const start = dayjs(timeData.start); // @ts-ignore
  const end = dayjs(timeData.end).isAfter(start) // @ts-ignore
    ? dayjs(timeData.end) // @ts-ignore
    : dayjs(timeData.end).add(1, 'day'); // @ts-ignore
  const interval = dayjs.duration(timeData.interval).asMilliseconds(); // convert to milliseconds

  let current: dayjs.Dayjs = start.clone();

  while (true) {
    arrayOfTime.push(`${current.format('HH:mm')} - ${current.add(interval, 'ms').format('HH:mm')}`);

    current = current.add(interval, 'ms');
    if (!current.isBetween(start, end, null, '[)')) break;
  }

  return arrayOfTime;
}
