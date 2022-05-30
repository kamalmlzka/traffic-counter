export interface Time {
  hour: number;
  minute: number;
  second: number;
}

export interface TimeData {
  start: Time;
  end: Time;
  interval: Time;
}
