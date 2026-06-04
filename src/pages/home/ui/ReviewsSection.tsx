import { useEffect, useState } from "react";
import BrutalistReviewCard, {
  BrutalistReviewCardProps,
} from "../../../ui/ReviewCard";
import { getReviews } from "../../../api/reviews";
import { MessageSquare, TrendingUp, Star } from "lucide-react";

export default function ReviewSection() {
  const [reviews, setReviews] = useState<BrutalistReviewCardProps[]>([]);

  useEffect(() => {
    (async () => {
      const reviews = await getReviews();
      setReviews(reviews || []);
    })();
  }, []);

  return (
    <>
      {reviews.length > 0 && (
        <section className="container px-4 pt-20 border-t border-foreground/10">
          <div className="bg-background pt-8">
            <div className="max-w-7xl">
              {/* Header */}
              <div className="mb-12 animate-fade-in-up">
                <span className="inline-block px-3 py-1 bg-vibrant-amber/10 text-vibrant-amber font-mono text-sm rounded-full mb-4">
                  Testimonials
                </span>
                <h1 className="font-mono text-5xl font-bold mb-4 text-foreground">
                  CLIENT REVIEWS
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  What our clients say about working with FoxwareDen
                </p>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {reviews.map((review, index) => {
                  return (
                    <div
                      key={index}
                      className="animate-fade-in-up opacity-0"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <BrutalistReviewCard
                        rating={review.rating}
                        description={review.description}
                        reviewerName={review.reviewerName}
                        created_at={review.created_at}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Stats Section */}
              <div className="border border-foreground/10 rounded-xl p-8 bg-card animate-fade-in-up opacity-0 [animation-delay:0.4s]">
                <h2 className="font-mono text-3xl font-bold mb-8 text-center text-foreground">
                  REVIEW STATISTICS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vibrant-amber to-vibrant-pink p-0.5 mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
                        <Star className="w-8 h-8 text-vibrant-amber" />
                      </div>
                    </div>
                    <div className="font-mono text-5xl font-bold mb-2 bg-gradient-to-r from-vibrant-amber to-vibrant-pink bg-clip-text text-transparent">
                      4.8
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">
                      Average Rating
                    </div>
                  </div>

                  <div className="text-center group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vibrant-purple to-vibrant-teal p-0.5 mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
                        <MessageSquare className="w-8 h-8 text-vibrant-purple" />
                      </div>
                    </div>
                    <div className="font-mono text-5xl font-bold mb-2 bg-gradient-to-r from-vibrant-purple to-vibrant-teal bg-clip-text text-transparent">
                      127
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">
                      Total Reviews
                    </div>
                  </div>

                  <div className="text-center group">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vibrant-teal to-vibrant-blue p-0.5 mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-vibrant-teal" />
                      </div>
                    </div>
                    <div className="font-mono text-5xl font-bold mb-2 bg-gradient-to-r from-vibrant-teal to-vibrant-blue bg-clip-text text-transparent">
                      98%
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">
                      Satisfaction Rate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
