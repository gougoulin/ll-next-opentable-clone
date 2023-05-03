import MenuItemCard from "@/app/restaurant/[slug]/menu/components/MenuItemCard";
import { useRestaurant } from "@/app/hooks/useRestaurant";

export default async function RestaurantMenuPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { items } = await useRestaurant(slug);
  return (
    <div className="flex flex-row flex-wrap items-center justify-start py-4">
      {items.map((item) => {
        return <MenuItemCard key={item.id} item={item} />;
      })}
    </div>
  );
}
