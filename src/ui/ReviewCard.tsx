import { Star } from "lucide-react";
import { Review } from "../api/reviews";

export interface BrutalistReviewCardProps extends Partial<Review> {
  rating: number;
  className?: string;
  created_at?: string;
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
      className={`group relative overflow-hidden border border-foreground/10 bg-card p-6 rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all duration-500 ${className}`}
    >
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vibrant-purple via-vibrant-teal to-vibrant-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Decorative shapes */}
      <div className="absolute top-2 right-2 w-10 h-10 bg-vibrant-amber/20 rotate-12 rounded-lg pointer-events-none opacity-60 group-hover:scale-110 transition-transform" />
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-vibrant-pink/20 -rotate-6 rounded-lg pointer-events-none opacity-60 group-hover:scale-110 transition-transform" />
      <div className="absolute top-1/2 right-8 w-6 h-6 bg-vibrant-teal/30 rotate-45 rounded pointer-events-none opacity-60" />

      <div className="relative z-10">
        {/* Rating Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 transition-colors ${
                  star <= rating
                    ? "fill-vibrant-amber text-vibrant-amber"
                    : "fill-none text-foreground/20"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-xl font-bold text-foreground">{rating}.0</span>
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed mb-4 text-muted-foreground">
          {description}
        </p>

        {/* Reviewer Info */}
        {(reviewerName || created_at) && (
          <div className="border-t border-foreground/10 pt-4 mt-4">
            <div className="flex justify-between items-start">
              <div>
                {reviewerName && (
                  <p className="font-mono font-bold text-sm uppercase text-foreground">
                    {reviewerName}
                  </p>
                )}
              </div>
              {created_at && (
                <p className="font-mono text-sm text-muted-foreground">
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
