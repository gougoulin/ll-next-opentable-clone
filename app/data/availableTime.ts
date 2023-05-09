import dayjs, { Dayjs } from "dayjs";

/**
 * Returns an array of available times between open and close times
 */
export default function availableTimes(open: Dayjs, close: Dayjs, now = dayjs()): string[] {
  const start = open.set("minute", 0); // round up to the current hour
  let result: string[] = [];
  let value = start; // value is always before or equal to open
  if (!start.isValid() || !value.isValid() || !close.isValid()) throw Error("Invalid date time");
  while (true) {
    if (value.isBefore(now)) continue; // skip past times
    result.push(value.format("HH:mm:ss")); // UTC time
    value = value.add(30, "minute");
    if (!value.isValid()) throw Error("Invalid date time");
    if (value.isAfter(close)) break; // stop at close time
  }
  return result;
}
