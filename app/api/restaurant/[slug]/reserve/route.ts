import { NextRequest, NextResponse } from "next/server";
import {
  extractInput,
  findAvailableTales,
  getRestaurantBySlug,
} from "@/app/services/restaurant.service";
import dayjs, { Dayjs } from "dayjs";
import { reserve } from "@/app/services/reserve.service";
import { dbClient } from "@/app/providers/prisma.client";
import { Booking_Table } from ".prisma/client";

async function findTablesToReserve(bookingTimeObj: Dayjs, bookingSize: number, slug: string) {
  // reused the function created for availability
  const available = await findAvailableTales(bookingTimeObj, slug);
  if (available === null) return null;
  // filter the available to find the exact object needed
  const tablesAtBookingTime = available.find(
    (elem) => elem.time === bookingTimeObj.format("HH:mm:ss")
  );
  // next is to find out which table should be reserved
  if (tablesAtBookingTime == undefined) return null;
  // 1. sort the tables by seats in descendent order
  const sortedTables = tablesAtBookingTime.tables.sort((a, b) => b.seats - a.seats);
  // 2. reserve tables making the total seats the smallest
  // For simplicity, assume tables have seats 2 or 4
  const reservedTables: string[] | null = reserve["simple"](sortedTables, bookingSize);
  return reservedTables;
}

export async function POST(req: NextRequest, params: { params: { slug: string } }) {
  const {
    guests,
    bookingEmail,
    bookingPhone,
    bookingFirstName,
    bookingLastName,
    bookingTime,
    bookingRequest,
  } = await req.json();
  const restaurant = await getRestaurantBySlug(params.params.slug);
  if (restaurant == null) return NextResponse.json("No restaurant found", { status: 404 });
  const dateTimeObj = dayjs(bookingTime);
  const reservedTables = await findTablesToReserve(dateTimeObj, +guests, params.params.slug);
  if (reservedTables == null) return NextResponse.json("No tables available", { status: 404 });
  const booking = await dbClient.booking.create({
    data: {
      guests,
      bookingEmail,
      bookingPhone,
      bookingFirstName,
      bookingLastName,
      bookingTime: dateTimeObj.toDate(),
      bookingRequest: bookingRequest ?? "",
      restaurantId: restaurant.id,
    },
  });
  const rows: { bookingId: string; tableId: string }[] = reservedTables.map((it) => {
    return {
      bookingId: booking.id,
      tableId: it,
    };
  });
  const booking2Table = await dbClient.booking_Table.createMany({
    data: rows,
  });
  return NextResponse.json({
    status: "complete",
    data: {
      booking,
      booking2Table,
    },
  });
}

export async function GET(req: NextRequest, params: { params: { slug: string } }) {
  const { bookingSize, bookingTime, bookingTimeObj } = extractInput(req);
  if (bookingSize === null || bookingTime === null) {
    return NextResponse.json("bookingsize and bookingtime are required", { status: 400 });
  }
  const reservedTables = await findTablesToReserve(
    bookingTimeObj,
    +bookingSize,
    params.params.slug
  );
  return NextResponse.json({ reservedTables: reservedTables });
}
