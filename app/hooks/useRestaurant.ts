import { getRestaurantBySlug } from "@/app/services/restaurant.service";

const useRestaurant = async (slug: string) => {
  const restaurant = await getRestaurantBySlug(slug);
  if (restaurant === null) throw new Error("Restaurant not found");
  return restaurant;
};

export { useRestaurant };
