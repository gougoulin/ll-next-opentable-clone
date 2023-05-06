import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import { findAvailableTales, getAvailability } from "@/app/services/restaurant.service";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  // 0. retrieve inputs from request
  const query = req.nextUrl.searchParams;
  const bookingSize: string | null = query.get("bookingsize");
  const bookingTime: string | null = query.get("bookingtime");
  if (bookingSize === null || bookingTime === null) {
    return NextResponse.json("bookingsize and bookingtime are required", { status: 400 });
  }
  const bookingTimeObj = dayjs(bookingTime);
  const available = await findAvailableTales(bookingTimeObj, params.slug);
  if (available === null) {
    return NextResponse.json({});
  }
  // 6. availabilities
  const result = getAvailability(available, +bookingSize);
  return NextResponse.json(result);
}
