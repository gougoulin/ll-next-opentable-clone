import { Review } from "@prisma/client";
import { getReviewOfUser } from "@/app/services/user.service";
import Stars from "@/app/components/Stars";

const ReviewCard = ({ review }: { review: Review }) => {
  const { rating, firstName, lastName, text } = review;
  return (
    <div className="flex flex-row gap-8 p-4">
      <div className="flex min-w-fit flex-col items-center text-sm">
        <div className="flex h-16 w-16 flex-row items-center justify-center rounded-full bg-cyan-800 text-xl text-white">
          {(firstName[0] + lastName[0]).toUpperCase()}
        </div>
        <div className="mt-3">{firstName + lastName[0].toUpperCase()}</div>
      </div>
      <div className="text-sm">
        <div className="mb-2">
          <Stars rating={parseFloat(rating)} /> <span>Dined 3 days ago</span>
        </div>
        <div>
          <span>Overall</span> 5 - <span>Food</span> 5 - <span>Service</span> 5 -{" "}
          <span>Ambience</span> 5
        </div>
        <p className="mb-2 mt-4 overflow-hidden">{text}</p>
        <button className="text-red-600">+ Read more</button>
      </div>
    </div>
  );
};
export default ReviewCard;
