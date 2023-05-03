import { Metadata } from "next";
import { getRestaurantBySlug } from "@/app/services/restaurant.service";
import { useRestaurant } from "@/app/hooks/useRestaurant";
import ReviewCard from "@/app/restaurant/[slug]/components/ReviewCard";
import { getAverageRating } from "@/app/services/review.service";
import { getReviewOfUser } from "@/app/services/user.service";
import Stars from "@/app/components/Stars";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Restaurant | OpenTable Clone",
    description: "Restaurant details",
  };
}

interface RestaurantPageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const RestaurantPage = async ({ params: { slug } }: RestaurantPageProps) => {
  const { name, description, images, reviews } = await useRestaurant(slug);

  return (
    <>
      <h2 className="py-8 text-4xl font-bold">{name}</h2>
      <hr />
      <div className="flex flex-row gap-4 py-4 text-sm">
        <Stars rating={4.5} />
        <span>{getAverageRating(reviews)}</span>
        <span>{reviews.length} Reviews</span>
        <span>$40 and under</span>
        <span>Italian</span>
      </div>
      <div className="flex flex-row items-center gap-3 text-sm">
        <span className="font-medium">Top tags:</span>
        <button className="rounded-xl border border-neutral-200 p-2 hover:border-red-600">
          Good For Special Occasions
        </button>
        <button className="rounded-xl border border-neutral-200 p-2 hover:border-red-600">
          Good For Groups
        </button>
        <button className="rounded-xl border border-neutral-200 p-2 hover:border-red-600">
          Romantic
        </button>
      </div>
      <p className="mt-8 h-[80px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
        {description}
      </p>
      <button className="text-red-600">+ Read more</button>

      {/*  photos start */}
      <div id={`${slug}-photos`}>
        <h2 className="border-b border-neutral-200 py-4 text-2xl font-medium">110 photos</h2>
        <div className="flex">
          <div className="mt-4 grid grid-cols-4 grid-rows-2 gap-1">
            {images.map((uri, indx) => {
              const baseImageClazz = "object-cover";
              let clazz = "w-[149px] h-[160px]";
              if (indx === 0) {
                clazz = "w-[302px] h-[324px] col-span-2 col-start-1 row-span-2 row-start-1";
              }
              return (
                <img
                  className={baseImageClazz + " " + clazz}
                  key={`${slug}-${uri}`}
                  src={uri}
                  alt={`${slug}-${uri}`}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/*  photos end */}

      {/*  reviews start */}
      <div id={`${slug}-reviews`} className="mt-8">
        <h2 className="border-b border-neutral-200 py-4 text-2xl font-medium">
          What 100 people are saying
        </h2>
        {/*  review card start */}
        {reviews &&
          reviews.map((review) => {
            return <ReviewCard key={review.id} review={review} />;
          })}

        {/*  review card end */}
      </div>
      {/*  reviews end */}
    </>
  );
};
export default RestaurantPage;
