import { PRICE } from "@prisma/client";

const Price = ({ price }: { price: String }) => {
  let full = 1,
    empty = 3;
  switch (price) {
    case PRICE.CHEAP:
      empty = 2;
      full = 2;
      break;
    case PRICE.REGULAR:
      empty = 1;
      full = 3;
      break;
    case PRICE.EXPENSIVE:
      full = 4;
      empty = 0;
      break;
    default:
      empty = 3;
      full = 1;
  }

  return (
    <>
      <span className="font-medium text-neutral-900">{"$".repeat(full)}</span>
      <span className="text-neutral-400">{"$".repeat(empty)}</span>
    </>
  );
};
export default Price;
