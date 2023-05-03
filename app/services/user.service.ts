import { dbClient } from "@/app/providers/prisma.client";
import { User } from "@prisma/client";

export const getReviewOfUser = (userId: string) => {
  return dbClient.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      reviews: true,
    },
  });
};

export const findUserByEmail = (email: string) => {
  return dbClient.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = (data: User) => {
  return dbClient.user.create({
    data,
  });
};
