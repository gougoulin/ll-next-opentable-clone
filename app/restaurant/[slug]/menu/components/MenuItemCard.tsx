import { Item } from ".prisma/client";

const MenuItemCard = ({ item: { name, description, price } }: { item: Item }) => {
  return (
    <div className="flex w-1/2 flex-row items-start justify-between p-4 text-sm">
      <div className="w-3/4">
        <h3>{name ?? "unknown"}</h3>
        <h4 className="text-neutral-400 min-h-[80px]">{description}</h4>
      </div>
      <div>
        <p>{price}</p>
      </div>
    </div>
  );
};
export default MenuItemCard;
