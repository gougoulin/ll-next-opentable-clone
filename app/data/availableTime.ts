import dayjs, { Dayjs } from "dayjs";

export default function availableTimes(open: Dayjs, close: Dayjs, now = dayjs()): string[] {
  const start = open.set("minute", 0);
  let result: string[] = [];
  let value = start;
  if (!start.isValid() || !value.isValid() || !close.isValid()) throw Error("Invalid date time");
  while (true) {
    if (value.isBefore(now)) continue; // skip past times
    result.push(value.format("HH:mm:ssZ"));
    value = value.add(30, "minute");
    if (!value.isValid()) throw Error("Invalid date time");
    if (value.isAfter(close)) break; // stop at close time
  }
  return result;
}
