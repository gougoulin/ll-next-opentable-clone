import RestaurantNavBar from "@/app/restaurant/[slug]/components/RestaurantNavBar";
import { ReactNode } from "react";

interface RestaurantLayoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}

export default function RestaurantLayout(props: RestaurantLayoutProps) {
  const {
    children,
    params: { slug },
  } = props;
  return (
    <>
      <div className="min-h-[320px] bg-cyan-800"></div>
      <div className="mx-auto flex w-3/4 flex-row gap-4">
        {/* left aside start */}
        {/* left */}
        <div className="relative -top-[52px] w-2/3 rounded-t bg-white px-4">
          <RestaurantNavBar slug={slug} />
          {children}
        </div>
        {/* left aside end */}
        {/* right start */}
        <div className="relative -top-[52px] w-1/3 rounded-t bg-white text-sm">
          <div className="shadow">
            <h2 className="border-b border-neutral-200 py-4 text-center text-sm font-bold">
              Make a reservation
            </h2>
            <div className="px-3">
              <form>
                {/* no of diners start */}
                <section className="py-4">
                  <div className="mb-3 font-medium">No. of diners</div>
                  <select className="w-full border-b border-neutral-200 py-3 font-light">
                    <option>2 people</option>
                    <option>3 people</option>
                  </select>
                </section>
                {/* no of diners start */}
                <section className="flex flex-row justify-between gap-4 py-4">
                  <div className="flex-1">
                    <div className="mb-4 font-medium">Date</div>
                    <select className="w-full border-b border-neutral-200 py-3 font-light">
                      <option>25 Apr 2023</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <div className="mb-4 font-medium">Time</div>
                    <select className="w-full border-b border-neutral-200 py-3 font-light">
                      <option>10:00 pm</option>
                    </select>
                  </div>
                </section>
                <button className="w-full rounded bg-red-600 py-4 font-bold text-white">
                  Find a time
                </button>
                <div className="py-4">Booked 32 times today</div>
              </form>
            </div>
          </div>
        </div>
        {/* right end */}
      </div>
    </>
  );
}
