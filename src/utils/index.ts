import { IOHLCRecord } from '../interfaces/ohlc';

export function calculateMovingAverage(records: IOHLCRecord[]) {
  // Calculate the average based on the OHLC values
  const sum = records.reduce(
    (acc, record) =>
      acc + (record.open + record.high + record.low + record.close) / 4,
    0
  );
  const average = sum / records.length;

  return average;
}
