import Header from "@/app/components/Header";
import RestaurantCard from "@/app/components/RestaurantCard";
import { getRestaurants } from "@/app/services/restaurant.service";

export default async function Home() {
  const data = await getRestaurants();
  return (
    <>
      <Header />
      <section className="mx-auto mt-16 w-2/3">
        <h3 className="py-4 text-xl font-bold">Available for dinner now</h3>
        <hr />
        <div className="flex flex-row flex-wrap justify-center gap-4 py-4">
          {data.map((restaurant) => {
            return <RestaurantCard key={restaurant.id} {...restaurant} />;
          })}
        </div>
      </section>
    </>
  );
}
