import { db } from "./db";

export interface Review {
  rating: number; // 1-5
  description: string;
  reviewerName?: string;
  created_at: string;
}

export async function getReviews(): Promise<Review[] | null> {
  try {
    const { data, error } = await db.from("reviews").select("*");

    if (error) throw error;

    return data.map((item: Review) => ({
      ...item,
      created_at: new Date(item.created_at).toDateString(),
    }));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createReview(review: Review) {
  try {
    const validRatting = review.rating <= 5 && review.rating >= 1;

    if (!validRatting) throw new Error("invalid rating");

    const { error } = await db.from("reviews").insert(review);

    if (error) throw error;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
