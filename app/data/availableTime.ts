import dayjs, { Dayjs } from "dayjs";

export default function availableTimes(open: Dayjs, close: Dayjs, now = dayjs()): string[] {
  const start = open.set("minute", 0);
  let result: string[] = [];
  let value = start;
  if(!start.isValid() || !value.isValid()) throw Error("Invalid date time");
  while (true) {
    result.push(value.format("HH:mm:ssZ"));
    value = value.add(30, "minute");
    if(!value.isValid()) throw Error("Invalid date time");
    if (value.isBefore(open) || value.isAfter(close)) break;
  }
  return result;

  // return new Array(48)
  //   .fill(0)
  //   .map((_, indx): null | string => {
  //     const value = start.add(indx * 30, "minute");
  //     // if (value.isBefore(open) || value.isBefore(now) || value.isAfter(close)) {
  //     const format = "YYYY-MM-DDTHH:mm:ssZ";
  //     // console.log(value.format(format));
  //     if (value.isBefore(open) || value.isAfter(close)) {
  //       return null;
  //     }
  //     return value.format("HH:mm");
  //   })
  //   .filter((it) => it != null) as string[];
}
