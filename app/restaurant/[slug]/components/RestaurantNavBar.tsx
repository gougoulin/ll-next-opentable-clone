import Link from "next/link";
const RestaurantNavBar = ({slug}: { slug: string }) => {
    return (
      <nav className="border-b border-neutral-400">
        <ul className="flex flex-row gap-10 text-sm">
          <li className="py-4">
            <Link href={`/restaurant/${slug}`}>Overview</Link>
          </li>
          <li className="py-4">
            <Link href={`/restaurant/${slug}`}>Popular dishes</Link>
          </li>
          <li className="py-4">
            <Link href={`/restaurant/${slug}/#${slug}-photos}`}>Photos</Link>
          </li>
          <li className="py-4">
            <Link href={`/restaurant/${slug}/menu`}>Menu</Link>
          </li>
          <li className="py-4">
            <Link href={`/restaurant/${slug}#${slug}-reviews`}>Reviews</Link>
          </li>
        </ul>
      </nav>
    );
};
export default RestaurantNavBar;