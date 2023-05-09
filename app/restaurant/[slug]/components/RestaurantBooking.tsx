"use client";
import { partySize } from "@/app/data";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MouseEventHandler, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import availableTimes from "@/app/data/availableTime";
import validator from "validator";
import Link from "next/link";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function RestaurantBooking({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const [size, setSize] = useState<string>("");
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [timeValue, setTimeValue] = useState<string>("");
  const [availability, setAvailability] = useState<null | { time: string; available: boolean }[]>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePartySizeChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };
  const handleTimeChange = (e: SelectChangeEvent) => {
    setTimeValue(e.target.value as string);
  };
  /**
   * if user input a date, then use it
   * if not, use today as the date
   */
  const bookingDate = dayjs.isDayjs(dateValue)
    ? dateValue.format("YYYY-MM-DDT")
    : dayjs().format("YYYY-MM-DDT");
  // const open = dayjs(bookingDate + openTime.replace(/z$/i, ""));
  const open = dayjs(bookingDate + openTime.replace(/z$/i, ""));
  const close = dayjs(bookingDate + closeTime.replace(/z$/i, ""));
  // const close = dayjs(bookingDate + closeTime.replace(/z$/i, ""));
  if (!dayjs.isDayjs(open) || !dayjs.isDayjs(close)) {
    alert("not a valid open/close time");
    return <></>;
  }
  // handler
  const handleFindTime: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    // todo validate the data
    if (!validator.isNumeric(size)) {
      alert("size is not selected");
      return;
    }
    if (!validator.isTime(timeValue, { hourFormat: "hour24" })) {
      alert("it is not time");
      return;
    }
    if (dateValue == null) {
      alert("please select a date");
      return;
    }
    const [date, time] = timeValue.split(":");
    const dateTime = dateValue
      .set("hour", parseInt(date))
      .set("minute", parseInt(time))
      .format("YYYY-MM-DDTHH:mm:ss");
    fetch(`/api/restaurant/${slug}/availability?bookingsize=${size}&bookingtime=${dateTime}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status} ${res.statusText}`);
      })
      .then((data) => {
        if (Object.getOwnPropertyNames(data).length !== 0) {
          setAvailability(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="relative -top-[52px] w-1/3 rounded-t bg-white text-sm">
        <div className="shadow">
          <h2 className="border-b border-neutral-200 py-4 text-center text-sm font-bold">
            Make a reservation
          </h2>
          <div className="px-3">
            <form>
              {/* no of diners start */}
              <section className="py-4">
                <FormControl fullWidth>
                  <InputLabel id="diner-size-select-label">Diner size</InputLabel>
                  <Select
                    labelId="diner-size-select-label"
                    id="diner-size-select"
                    value={size}
                    label="Diner size"
                    onChange={handlePartySizeChange}
                  >
                    {partySize(10).map(({ label, value }) => {
                      return (
                        <MenuItem key={`diner-size-select-option-${label}`} value={"" + value}>
                          {label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </section>
              {/* no of diners start */}
              <section className="flex flex-row justify-between gap-4 py-4">
                <div className="flex-1">
                  <DatePicker
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                    label="Date"
                    defaultValue={null}
                  />
                </div>
                <div className="flex-1">
                  <FormControl fullWidth>
                    <InputLabel id="booking-time-select-label">Time</InputLabel>
                    <Select
                      className="w-full"
                      labelId="booking-time-select-label"
                      id="booking-time-select"
                      value={timeValue}
                      label="Diner size"
                      onChange={handleTimeChange}
                    >
                      {availableTimes(open, close, dayjs(bookingDate)).map((elem) => {
                        const formattedTime = dayjs(bookingDate + elem).format("HH:mm");
                        return (
                          <MenuItem
                            key={`booking-time-select-option-${formattedTime}`}
                            value={formattedTime}
                          >
                            {formattedTime}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </section>
              <button
                onClick={handleFindTime}
                className="mt-4 w-full rounded bg-red-600 py-4 font-bold text-white"
              >
                Find a time
              </button>
              <div className="mt-4">
                <ul className={"flex flex-row flex-wrap gap-3"}>
                  {availability &&
                    availability.map((elem) => {
                      const time = elem.time.replace(/:\d{2}\+.*$/, "");
                      return (
                        <li
                          className={
                            elem.available
                              ? "rounded bg-red-500 p-2 text-white"
                              : "rounded bg-neutral-500 p-2 text-white"
                          }
                          key={elem.time}
                        >
                          {elem.available ? (
                            <Link
                              href={`/restaurant/${slug}/reserve?bookingtime=${
                                bookingDate + time
                              }&bookingsize=${size}`}
                            >
                              {time.replace(/:00$/, "")}
                            </Link>
                          ) : (
                            time.replace(/:00$/, "")
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="py-4">Booked 32 times today</div>
            </form>
          </div>
        </div>
      </div>
      )
    </LocalizationProvider>
  );
}
