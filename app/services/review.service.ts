import { Review } from "@prisma/client";

export const getAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0);
  return total / reviews.length;
};
