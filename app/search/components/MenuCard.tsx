import { Restaurant } from "@prisma/client";
import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";

interface MenuCardProps {
  restaurant: Restaurant;
  rating: number;
}

const getRating = (rating: number) => {
  if (rating <= 1) return "Poor";
  else if (rating <= 2) return "Fair";
  else if (rating <= 3) return "Good";
  else if (rating <= 4) return "Very Good";
  else if (rating <= 5) return "Exceptional";
  return "unknown";
};

const MenuCard = ({ rating, restaurant: { name, price, mainImage, slug } }: MenuCardProps) => {
  return (
    <div className="flex flex-row gap-4 py-4">
      <div>
        <img
          className="h-[205px] w-[205px] object-cover"
          src={mainImage}
          alt={slug}
          width={205}
          height={205}
        />
      </div>
      <div className="flex flex-col gap-1 text-sm font-light">
        <h3 className="text-base font-medium">{name}</h3>
        <div className="flex flex-row gap-1">
          <Stars rating={rating} /> <span>{getRating(rating)}</span> (309)
        </div>
        <p>
          <Price price={price} /> - <span>Australian</span> - <span>Melbourne CBD</span>
        </p>
        <p>Booked 14 times today</p>
        <div>
          <button className="rounded border border-red-600 p-2 text-red-600">
            Find next available
          </button>
        </div>
        <p>
          At the moment, there&apos;s no online availability within 2.5 hours of your request. Do
          you have another time in mind?
        </p>
      </div>
    </div>
  );
};
export default MenuCard;
