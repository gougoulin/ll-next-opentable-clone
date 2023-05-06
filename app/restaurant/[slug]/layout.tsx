import { ReactNode } from "react";

interface RestaurantLayoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}

export default function RestaurantLayout(props: RestaurantLayoutProps) {
  const {
    children,
    params: { slug },
  } = props;
  return (
    <>
      <div className="min-h-[320px] bg-cyan-800"></div>
      <div className="mx-auto flex w-3/4 flex-row gap-4">{children}</div>
    </>
  );
}
