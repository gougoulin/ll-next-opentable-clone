import { dbClient } from "@/app/providers/prisma.client";
import { Restaurant } from ".prisma/client";
import { PRICE, Review } from "@prisma/client";

const getRestaurants = () => {
  return dbClient.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      images: true,
      mainImage: true,
      price: true,
      openTime: true,
      closeTime: true,
      reviews: true,
    },
  });
};

const getRestaurantBySlug = (slug: string) => {
  return dbClient.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      images: true,
      items: true,
      mainImage: true,
      price: true,
      openTime: true,
      closeTime: true,
      reviews: true,
    },
  });
};

const searchRestaurants = async (
  keyword: string
): Promise<Array<Restaurant & { reviews: Review[] }> | null> => {
  return dbClient.restaurant.findMany({
    include: {
      reviews: true,
    },
    where: {
      OR: [
        {
          location: {
            name: {
              contains: keyword.toLowerCase(),
              mode: "insensitive",
            },
          },
        },
        {
          cuisine: {
            name: {
              contains: keyword.toLowerCase(),
              mode: "insensitive",
            },
          },
        },
        {
          name: {
            contains: keyword.toLowerCase(),
            mode: "insensitive",
          },
        },
      ],
    },
  });
};

const getLocations = () => {
  return dbClient.location.findMany();
};

const getCuisines = () => {
  return dbClient.cuisine.findMany();
};

const searchRestaurantsbyFilter = async (
  region: string | string[] | undefined,
  cuisine: string | string[] | undefined,
  price: PRICE | PRICE[] | undefined
) => {
  const where: any = {};
  if (typeof region === "string") {
    where.location = { name: region };
  } else if (Array.isArray(region)) {
    where.location = { name: { in: region } };
  }
  if (typeof cuisine === "string") {
    where.cuisine = { name: cuisine };
  } else if (Array.isArray(cuisine)) {
    where.cuisine = { name: { in: cuisine } };
  }
  if (typeof price === "string") {
    where.price = price;
  } else if (Array.isArray(price)) {
    where.price = { in: price };
  }
  return dbClient.restaurant.findMany({
    where,
    include: {
      reviews: true,
    },
  });
};

export {
  getRestaurants,
  getRestaurantBySlug,
  searchRestaurants,
  getLocations,
  getCuisines,
  searchRestaurantsbyFilter,
};
