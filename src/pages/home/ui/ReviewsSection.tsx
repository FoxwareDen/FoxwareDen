import { useEffect, useState } from "react";
import BrutalistReviewCard, {
  BrutalistReviewCardProps,
} from "../../../ui/ReviewCard";
import { getReviews } from "../../../api/reviews";

export default function ReviewSection() {
  const [reviews, setReviews] = useState<BrutalistReviewCardProps[]>([
    {
      rating: 5,
      description:
        "FoxWareDen delivered an exceptional web application for our business. Their expertise in React and modern frameworks is unmatched. The final product exceeded our expectations in both performance and design.",
      reviewerName: "Sarah Johnson",
      created_at: "2024-01-15",
    },
    {
      rating: 5,
      description:
        "Working with this team was a game-changer. They built a robust CMS that streamlined our entire content workflow. Their attention to detail and use of cutting-edge technology like Rust made all the difference.",
      reviewerName: "Michael Chen",
      created_at: "2024-02-20",
    },
    {
      rating: 4,
      description:
        "Great experience from start to finish. The Tauri-based desktop application they developed runs smoothly across all platforms. Communication was clear and deadlines were met consistently.",
      reviewerName: "Emma Rodriguez",
      created_at: "2024-03-10",
    },
    {
      rating: 5,
      description:
        "Absolutely stellar work! They transformed our complex requirements into an elegant, performant solution. The use of Go for our backend services resulted in incredible speed and reliability.",
      reviewerName: "David Park",
      created_at: "2024-03-25",
    },
  ]);

  useEffect(() => {
    (async () => {
      const reviews = await getReviews();

      if (reviews?.length) {
        setReviews(reviews);
      }
    })();
  }, []);

  return (
    <section className="container px-4 pt-20 border-t-4 border-black dark:border-white">
      <div className=" bg-white dark:bg-black pt-8">
        <div className="max-w-7xl ">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-mono text-5xl font-bold mb-4">
              CLIENT REVIEWS
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              What our clients say about working with FoxWareDen
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {reviews.map((review, index) => {
              const row = Math.floor(index / 2); // 0 or 1 in a 2x2 grid
              const col = index % 2; // 0 = left, 1 = right

              // For even rows: [rotate-right, rotate-left]
              // For odd rows:  [rotate-left, rotate-right]
              const isEvenRow = row % 2 === 0;

              const rotation = isEvenRow
                ? col === 0
                  ? "rotate-1"
                  : "-rotate-1"
                : col === 0
                ? "-rotate-1"
                : "rotate-1";

              return (
                <BrutalistReviewCard
                  key={index}
                  rating={review.rating}
                  description={review.description}
                  reviewerName={review.reviewerName}
                  created_at={review.created_at}
                  className={`transform ${rotation}`}
                />
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="border-4 border-black dark:border-white p-8">
            <h2 className="font-mono text-3xl font-bold mb-6 text-center">
              REVIEW STATISTICS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="font-mono text-5xl font-bold mb-2">4.8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  AVERAGE RATING
                </div>
              </div>
              <div className="text-center">
                <div className="font-mono text-5xl font-bold mb-2">127</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  TOTAL REVIEWS
                </div>
              </div>
              <div className="text-center">
                <div className="font-mono text-5xl font-bold mb-2">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  SATISFACTION RATE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
