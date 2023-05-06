import { dbClient } from "@/app/providers/prisma.client";
import { Booking_Table, Restaurant } from ".prisma/client";
import { PRICE, Review } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import availableTimes from "@/app/data/availableTime";
import { NextRequest, NextResponse } from "next/server";

const getRestaurants = () => {
  return dbClient.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      images: true,
      mainImage: true,
      price: true,
      openTime: true,
      closeTime: true,
      reviews: true,
    },
  });
};

const getRestaurantBySlug = (slug: string) => {
  return dbClient.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      images: true,
      items: true,
      mainImage: true,
      price: true,
      openTime: true,
      closeTime: true,
      reviews: true,
    },
  });
};

const searchRestaurants = async (
  keyword: string
): Promise<Array<Restaurant & { reviews: Review[] }> | null> => {
  return dbClient.restaurant.findMany({
    include: {
      reviews: true,
    },
    where: {
      OR: [
        {
          location: {
            name: {
              contains: keyword.toLowerCase(),
              mode: "insensitive",
            },
          },
        },
        {
          cuisine: {
            name: {
              contains: keyword.toLowerCase(),
              mode: "insensitive",
            },
          },
        },
        {
          name: {
            contains: keyword.toLowerCase(),
            mode: "insensitive",
          },
        },
      ],
    },
  });
};

const getLocations = () => {
  return dbClient.location.findMany();
};

const getCuisines = () => {
  return dbClient.cuisine.findMany();
};

const searchRestaurantsbyFilter = async (
  region: string | string[] | undefined,
  cuisine: string | string[] | undefined,
  price: PRICE | PRICE[] | undefined
) => {
  const where: any = {};
  if (typeof region === "string") {
    where.location = { name: region };
  } else if (Array.isArray(region)) {
    where.location = { name: { in: region } };
  }
  if (typeof cuisine === "string") {
    where.cuisine = { name: cuisine };
  } else if (Array.isArray(cuisine)) {
    where.cuisine = { name: { in: cuisine } };
  }
  if (typeof price === "string") {
    where.price = price;
  } else if (Array.isArray(price)) {
    where.price = { in: price };
  }
  return dbClient.restaurant.findMany({
    where,
    include: {
      reviews: true,
    },
  });
};

const getExistBookings = async (bookingTimeObj: Dayjs, dateTimes: string[]) => {
  return dbClient.booking.findMany({
    where: {
      bookingTime: {
        gte: new Date(bookingTimeObj.format("YYYY-MM-DDT") + dateTimes[0]),
        lte: new Date(bookingTimeObj.format("YYYY-MM-DDT") + dateTimes[dateTimes.length - 1]),
      },
    },
    select: {
      bookingTime: true,
      bookingTables: true,
      guests: true,
    },
  });
};

const getAdjacentTimes = (open: Dayjs, close: Dayjs, bookingTimeObj: Dayjs, len: number = 1.2) => {
  const before: Dayjs = bookingTimeObj.add(-1 * len, "hour");
  const after: Dayjs = bookingTimeObj.add(len, "hour");
  return availableTimes(open, close).filter((it) => {
    const value: Dayjs = dayjs(bookingTimeObj.format("YYYY-MM-DD") + "T" + it);
    return value.isAfter(before) && value.isBefore(after);
  });
};

const findTables = (slug: string) => {
  return dbClient.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      openTime: true,
      closeTime: true,
    },
  });
};

const getTimeWithTables = (
  bookingTimeObj: Dayjs,
  dateTimes: string[],
  tables: {
    id: string;
    seats: number;
  }[],
  bookingMap: { [index: string]: { [index: string]: true } }
) => {
  return dateTimes.map((elem) => {
    const [hour, min] = elem.split(":");
    const date: string = bookingTimeObj
      .set("hour", parseInt(hour))
      .set("minute", parseInt(min))
      .toISOString();
    return {
      date,
      time: elem,
      tables: Object.hasOwnProperty.call(bookingMap, date)
        ? tables.filter((item) => {
            return !bookingMap[date].hasOwnProperty(item.id);
          })
        : tables,
    };
  });
};

const getAvailability = (
  available: {
    date: string;
    time: string;
    tables: { id: string; seats: number }[];
  }[],
  bookingSize: number
) => {
  return available.map((elem) => {
    const openSeats = elem.tables.reduce((acc: number, table: { id: string; seats: number }) => {
      return acc + table.seats;
    }, 0);
    return {
      available: +openSeats >= +bookingSize,
      time: elem.time,
    };
  });
};

const getBookingMap = (
  existBookings: {
    bookingTables: Booking_Table[];
    guests: number;
    bookingTime: Date;
  }[]
) => {
  const bookingMap: { [index: string]: { [index: string]: true } } = {};
  existBookings.forEach((it) => {
    const tableSet: { [index: string]: true } = {};
    it.bookingTables.forEach((item) => {
      tableSet[item.tableId] = true;
    });
    bookingMap[dayjs(it.bookingTime).toISOString()] = tableSet;
  });
  return bookingMap;
};

const findAvailableTales = async (bookingTimeObj: Dayjs, slug: string) => {
  // 4.
  const tablesFound = await findTables(slug);
  if (tablesFound == null) throw new Error(`Can not find tables for ${slug}`);
  const { openTime, closeTime } = tablesFound;
  // format tables data
  const tables: { id: string; seats: number }[] =
    tablesFound?.tables.map((it) => {
      return {
        id: it.id,
        seats: it.seats,
      };
    }) ?? [];
  // 1. find adjacent booking times
  // Must be the same day
  const dateTimes = getAdjacentTimes(
    dayjs(bookingTimeObj.format("YYYY-MM-DDT") + openTime),
    dayjs(bookingTimeObj.format("YYYY-MM-DDT") + closeTime),
    bookingTimeObj
  );
  if (dateTimes.length === 0) return null;
  // 2.
  const existBookings = await getExistBookings(bookingTimeObj, dateTimes);
  // 3.
  const bookingMap = getBookingMap(existBookings);
  // 5. filter the tables that were booked
  const available = getTimeWithTables(bookingTimeObj, dateTimes, tables, bookingMap);
  return available;
};

const extractInput = (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const bookingSize = searchParams.get("bookingsize");
  const bookingTime = searchParams.get("bookingtime");
  const bookingTimeObj = dayjs(bookingTime);
  return { bookingSize, bookingTime, bookingTimeObj };
};

export {
  getRestaurants,
  getRestaurantBySlug,
  searchRestaurants,
  getLocations,
  getCuisines,
  searchRestaurantsbyFilter,
  getAvailability,
  findAvailableTales,
  extractInput
};
