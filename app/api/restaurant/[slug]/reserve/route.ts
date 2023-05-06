import { NextRequest, NextResponse } from "next/server";
import { extractInput, findAvailableTales } from "@/app/services/restaurant.service";
import dayjs from "dayjs";
import { reserve } from "@/app/services/reserve.service";

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
  
  console.log(params);
  return NextResponse.json({});
}

export async function GET(req: NextRequest, params: { params: { slug: string } }) {
  const { bookingSize, bookingTime, bookingTimeObj } = extractInput(req);
  if (bookingSize === null || bookingTime === null) {
    return NextResponse.json("bookingsize and bookingtime are required", { status: 400 });
  }
  // reused the function created for availability
  const available = await findAvailableTales(bookingTimeObj, params.params.slug);
  if (available === null) return NextResponse.json({});
  // filter the available to find the exact object needed
  const tablesAtBookingTime = available.find(
    (elem) => elem.time === bookingTimeObj.format("HH:mm:ssZ")
  );
  // next is to find out which table should be reserved
  if (tablesAtBookingTime == undefined) return NextResponse.json("no tables available");
  // 1. sort the tables by seats in descendent order
  const sortedTables = tablesAtBookingTime.tables.sort((a, b) => b.seats - a.seats);
  // 2. reserve tables making the total seats the smallest
  // For simplicity, assume tables have seats 2 or 4
  const reservedTables: string[] | null = reserve["simple"](sortedTables, +bookingSize);
  return NextResponse.json({ reservedTables: reservedTables });
}
