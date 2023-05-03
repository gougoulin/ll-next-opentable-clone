import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const getNextUrl = (
  region: string | undefined | null,
  currentCuisine: string | undefined | null,
  price: string | undefined | null
) => {
  let nextUrl = `/search?`;
  if (region != undefined) {
    if (nextUrl[nextUrl.length - 1] !== "?") nextUrl += "&";
    nextUrl += `region=${region}`;
  }
  if (currentCuisine != undefined) {
    if (nextUrl[nextUrl.length - 1] !== "?") nextUrl += "&";
    nextUrl += `cuisine=${currentCuisine}`;
  }
  if (price != undefined) {
    if (nextUrl[nextUrl.length - 1] !== "?") nextUrl += "&";
    nextUrl += `price=${price}`;
  }
  return nextUrl;
};

export const handleSearchRefresh = (
  router: AppRouterInstance,
  val: {
    region?: string | null;
    cuisine?: string | null;
    price?: string | null;
  }
) => {
  const nextUrl = getNextUrl(val?.region, val?.cuisine, val?.price);
  if (nextUrl !== `/search?`) {
    router.push(nextUrl);
  } else {
    router.push(`/search`);
  }
};
