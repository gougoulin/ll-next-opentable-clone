import Hero from "@/app/search/components/Hero";
import MenuCard from "@/app/search/components/MenuCard";
import Divider from "@/app/search/components/Divider";
import { Metadata } from "next";
import {
  getCuisines,
  getLocations,
  searchRestaurants,
  searchRestaurantsbyFilter,
} from "@/app/services/restaurant.service";
import Link from "next/link";
import SideBar from "@/app/search/components/SideBar";
import { PRICE, Review } from "@prisma/client";
import { Restaurant } from ".prisma/client";
import { getAverageRating } from "@/app/services/review.service";

export const metadata: Metadata = {
  title: "Search | OpenTable Clone",
  description: "Search for restaurants",
};

interface SearchPageProps {
  searchParams: {
    q: string | string[] | undefined;
    region: string | string[] | undefined;
    cuisine: string | string[] | undefined;
    price: PRICE | undefined;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  let restaurants: (Restaurant & { reviews: Review[] })[] | null;
  const { q, region, cuisine, price } = searchParams;
  if (typeof q === "string") {
    restaurants = await searchRestaurants(q);
  } else {
    restaurants = await searchRestaurantsbyFilter(region, cuisine, price);
  }
  if (restaurants == null || restaurants.length === 0) {
    restaurants = [];
  }
  // locations & cuisines for sidebar
  const locations = await getLocations();
  const cuisines = await getCuisines();
  return (
    <>
      <Hero />
      {/* main start */}
      <main className="w mx-auto flex w-4/5 flex-row gap-10">
        {/* aside */}
        <SideBar cuisines={cuisines} locations={locations} />
        <div className="flex w-full flex-col">
          <div className="mt-4 flex flex-row items-center p-4">
            {restaurants.length} restaurants found.
          </div>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <>
                  <MenuCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    rating={getAverageRating(restaurant.reviews)}
                  />
                  <Divider key={`${restaurant.id}-divider`} />
                </>
              );
            })}
        </div>
      </main>
      {/* main end */}
    </>
  );
};
export default SearchPage;
