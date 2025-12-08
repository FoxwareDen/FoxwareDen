import { Star } from "lucide-react";
import { Review } from "../api/reviews";

export interface BrutalistReviewCardProps extends Partial<Review> {
  rating: number;
  className?: string;
}

export default function BrutalistReviewCard({
  rating,
  description,
  reviewerName,
  created_at,
  className = "",
}: BrutalistReviewCardProps) {
  return (
    <div
      className={`relative overflow-hidden border-4 border-black dark:border-white bg-white dark:bg-black p-6 ${className}`}
    >
      <div className="absolute top-2 right-2 w-12 h-12 bg-[#FFD60A] rotate-12 pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-[#FF5252]  -rotate-6 pointer-events-none"></div>
      <div className="absolute top-1/2 right-8 w-8 h-8 border-2 bg-blue-500 rotate-45 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Rating Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= rating
                    ? "fill-black dark:fill-white stroke-black dark:stroke-white"
                    : "fill-none stroke-black dark:stroke-white"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-2xl font-bold">{rating}.0</span>
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed mb-4 dark:text-white">
          {description}
        </p>

        {/* Reviewer Info */}
        {(reviewerName || created_at) && (
          <div className="border-t-2 border-black dark:border-white pt-4 mt-4">
            <div className="flex justify-between items-start">
              <div>
                {reviewerName && (
                  <p className="font-mono font-bold text-sm uppercase">
                    {reviewerName}
                  </p>
                )}
              </div>
              {created_at && (
                <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                  {created_at}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
