import Image from "next/image";
import { Restaurant } from ".prisma/client";
import Link from "next/link";
import Price from "@/app/components/Price";
import { PRICE, Review } from "@prisma/client";
import { getAverageRating } from "@/app/services/review.service";
import Stars from "@/app/components/Stars";

interface RestaurantProps {
  price: PRICE;
  slug: string;
  name: string;
  mainImage: string;
  reviews: Review[];
}

const RestaurantCard = ({ slug, name, mainImage, price, reviews }: RestaurantProps) => {
  const rating = getAverageRating(reviews);
  return (
    <div className={"overflow-clip rounded border border-neutral-200"}>
      <div>
        <Link href={`/restaurant/${slug}`}>
          <img
            className="h-[132px] w-[234px] object-cover"
            src={mainImage}
            alt={slug}
            height={132}
            width={234}
          />
        </Link>
      </div>
      <div className="flex flex-col p-2 text-sm">
        <h3 className="mb-1 text-base font-bold">{name}</h3>
        <div className="mb-1 flex flex-row gap-2 text-sm">
          <Stars rating={rating} />
          <span>{reviews?.length} reviews</span>
        </div>
        <div className="mb-2">
          <span>Italian</span>&#x2022;
          <Price price={price} />
          &#x2022;<span>Melbourne CBD</span>
        </div>
        <div>
          <span>Booked 27 times today</span>
        </div>
        <div className="flex flex-row gap-1 py-2 text-sm font-bold">
          <button className="rounded bg-red-600 px-2 py-1 text-white">7:15 pm</button>
          <button className="rounded bg-red-600 px-2 py-1 text-white">7:30 pm</button>
        </div>
      </div>
    </div>
  );
};
export default RestaurantCard;
