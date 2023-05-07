import { useRestaurant } from "@/app/hooks/useRestaurant";
import dayjs from "dayjs";
import { MouseEventHandler } from "react";
import ReservationCard from "@/app/restaurant/[slug]/reserve/components/ReservationCard";

interface ReservePageProps {
  params: { slug: string };
  searchParams: {
    date: string;
    guests: string;
  };
}

export default async function ReservePage({ params, searchParams }: ReservePageProps) {
  const { mainImage, name, id } = await useRestaurant(params.slug);
  const { date, guests } = searchParams;

  return (
    <div className={"min-h-screen"}>
      <div className="p-4 text-lg text-neutral-500">You&apos;re almost done!</div>
      <div className={"flex flex-row gap-4"}>
        <div>
          <img src={mainImage} alt="retaurant image" width={200} height={200} />
        </div>
        <div className={"p-2"}>
          <h3 className={"text-xl font-bold"}>{name}</h3>
          <div className={"mt-2 flex flex-row gap-3 text-sm text-neutral-500"}>
            <span>{dayjs(date).format("ddd, DD MMM YYYY")}</span>
            <span>{dayjs(date).format("hh:mm A")}</span>
            <span>{+guests === 1 ? "1 person" : `${guests} people`}</span>
          </div>
        </div>
      </div>
      <ReservationCard
        slug={params.slug}
        restaurantId={id}
        guests={+guests}
        bookingTime={dayjs(date).toISOString()}
      />
    </div>
  );
}
