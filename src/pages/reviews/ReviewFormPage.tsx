import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import {
  createReview,
  invalidateReviewPortal,
  validateReviewPortal,
} from "../../api/reviews";
import Loading from "../../ui/Loading";
import ErrorSection from "../../ui/ErrorSection";
import { Star } from "lucide-react";

export default function ReviewFormPage() {
  const { token, name } = useParams({ strict: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    message: string;
    type: "error" | "warning";
  } | null>(null);

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [description, setDescription] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  // const [sliderValue, setSliderValue] = useState(50);
  // const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        if (!token || !name) {
          setError({ message: "invalid url configuration", type: "error" });
          return;
        }
        const result = await validateReviewPortal(token, name);

        if (!result) {
          setError({ message: "failed portal invalid", type: "error" });
          return;
        }
      } catch (error) {
        console.error(error);
        setError({ message: "failed portal invalid", type: "error" });
      } finally {
        setLoading(false);
      }
    })();
  }, [token, name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !token) return;

    const reviewResult = await createReview({
      rating,
      description,
      reviewerName: reviewerName.length > 0 ? reviewerName : undefined,
      client_ref: name,
    });

    if (!reviewResult) {
      setError({ message: "failed to submit review", type: "error" });
      return;
    } else {
      const invalidateResult = await invalidateReviewPortal(token);

      if (!invalidateResult) {
        setError({ message: "failed to invalidate portal", type: "error" });
        return;
      }
    }

    setSubmitted(true);
    // setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {loading ? (
        <div className="min-h-[500px] flex items-center justify-center">
          <Loading size="full" text="Validating Portal Credentials" />
        </div>
      ) : error ? (
        <div className="min-h-[720px] flex items-center justify-center">
          <ErrorSection
            message="portal validation has expired or been removed"
            title={error.message}
            type={error.type}
          />
        </div>
      ) : (
        <>
          <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="absolute top-24 left-10 w-40 h-40 bg-vibrant-purple/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-24 right-10 w-48 h-48 bg-vibrant-teal/10 rounded-full blur-3xl animate-float [animation-delay:1s]" />
            {/* Hero Section */}
            <section className="py-16 relative overflow-hidden">
              <div className="container mx-auto px-4">
                <div className="relative max-w-2xl mx-auto text-center transform -rotate-1 border border-foreground/10 p-8 md:p-12 bg-card rounded-2xl shadow-xl overflow-hidden">
                  <h1 className="text-5xl md:text-7xl font-bold font-mono mb-4">
                    SUBMIT REVIEW
                  </h1>
                  <p className="text-lg font-mono">
                    Share your experience with our services
                  </p>
                </div>
              </div>

              {/* Background shapes */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 transform rotate-12 opacity-20" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 transform -rotate-12 opacity-20" />
            </section>

            {/* Form Section */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Rating */}
                    <div className="border border-foreground/10 p-6 bg-card rounded-2xl shadow-sm">
                      <label className="block font-mono font-bold text-lg mb-4">
                        RATING *
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="p-2 border border-foreground/10 rounded-lg text-vibrant-amber hover:bg-vibrant-amber hover:text-white transition-colors"
                          >
                            <Star
                              size={32}
                              fill={
                                star <= (hoveredRating || rating)
                                  ? "currentColor"
                                  : "none"
                              }
                              strokeWidth={2}
                            />
                          </button>
                        ))}
                      </div>
                      <p className="mt-2 font-mono text-sm">
                        Selected: {rating > 0 ? `${rating} / 5` : "None"}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="border border-foreground/10 p-6 bg-card rounded-2xl shadow-sm">
                      <label
                        htmlFor="description"
                        className="block font-mono font-bold text-lg mb-4"
                      >
                        DESCRIPTION *
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={6}
                        className="w-full border border-foreground/10 rounded-xl p-4 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-vibrant-purple/50 focus:border-vibrant-purple"
                        placeholder="Share your detailed experience..."
                      />
                    </div>

                    {/* Optional Name */}
                    <div className="border border-foreground/10 p-6 bg-card rounded-2xl shadow-sm">
                      <label
                        htmlFor="name"
                        className="block font-mono font-bold text-lg mb-4"
                      >
                        NAME (OPTIONAL)
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        className="w-full border border-foreground/10 rounded-xl p-4 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-vibrant-purple/50 focus:border-vibrant-purple"
                        placeholder="Your name (leave blank for anonymous)"
                      />
                    </div>

                    {/* Collapsible with Slider */}
                    {/* <div className="border-4 border-black dark:border-white bg-white dark:bg-black">
                      <button
                        type="button"
                        onClick={() => setIsCollapsibleOpen(!isCollapsibleOpen)}
                        className="w-full p-6 flex justify-between items-center font-mono font-bold text-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                      >
                        <span>ADDITIONAL FEEDBACK</span>
                        {isCollapsibleOpen ? (
                          <ChevronUp size={24} strokeWidth={3} />
                        ) : (
                          <ChevronDown size={24} strokeWidth={3} />
                        )}
                      </button>

                      {isCollapsibleOpen && (
                        <div className="p-6 border-t-4 border-black dark:border-white">
                          <div className="space-y-4">
                            <label className="block font-mono font-bold text-lg mb-6">
                              HOW WOULD YOU RATE THE OVERALL QUALITY?
                            </label>

                            <div className="flex justify-between font-mono font-bold">
                              <span>BAD</span>
                              <span>GOOD</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={sliderValue}
                              onChange={(e) =>
                                setSliderValue(Number(e.target.value))
                              }
                              className="w-full h-4 appearance-none cursor-pointer bg-white dark:bg-black border-2 border-black dark:border-white"
                              style={{
                                background: `linear-gradient(to right, #ef4444 0%, #fbbf24 50%, #22c55e 100%)`,
                              }}
                            />
                            <div className="text-center font-mono font-bold text-2xl">
                              {sliderValue}%
                            </div>
                            <div className="text-center font-mono">
                              {sliderValue < 33
                                ? "POOR"
                                : sliderValue < 66
                                ? "AVERAGE"
                                : "EXCELLENT"}
                            </div>
                          </div>
                        </div>
                      )}
                    </div> */}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={
                        rating === 0 || !description.trim() || submitted
                      }
                      className="w-full p-4 rounded-xl bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white font-mono font-bold text-xl shadow-lg hover:shadow-vibrant-purple/25 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitted ? "✓ SUBMITTED" : "SUBMIT REVIEW"}
                    </button>
                  </form>

                  {submitted && (
                    <div className="mt-8 p-6 border-4 border-black dark:border-white bg-green-400 dark:bg-green-600">
                      <p className="font-mono font-bold text-center text-xl">
                        THANK YOU FOR YOUR REVIEW!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}
