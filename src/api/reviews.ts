import { db } from "./db";
// ====================================== Review Portal  ======================================
export interface ReviewPortal {
  valid_token: string;
  invalidate_amount: number;
  client_ref: string;
  email: string;
}

export async function createReviewPortal(data: {
  invalidate_amount: number;
  client_ref: string;
  email: string;
}): Promise<string | null> {
  try {
    if (!(data.invalidate_amount > 0 && data.invalidate_amount < 367)) {
      throw new Error("invalid invalidate_amount");
    }

    if (!data.client_ref || typeof data.client_ref !== "string") {
      throw new Error("invalid client_ref");
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      throw new Error("invalid email");
    }

    const valid_token = crypto.randomUUID();

    const { error } = await db.from("review_portal").insert([
      {
        ...data,
        valid_token,
      },
    ]);

    if (error) throw error;

    return `${window.location.origin}/reviews/form/${valid_token}/${data.client_ref}`;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function validateReviewPortal(token: string, client_ref: string) {
  try {
    const { data, error } = await db
      .from("review_portal")
      .select("*")
      .eq("valid_token", token)
      .eq("client_ref", client_ref)
      .single();

    if (error) throw error;

    // Check if portal is expired
    const createdAt = new Date(data.created_at).getTime(); // milliseconds
    const now = new Date().getTime();
    const expirationDate =
      createdAt + data.invalidate_amount * 24 * 60 * 60 * 1000; // days to milliseconds
    const isExpired = now - expirationDate > 0;

    if (isExpired) {
      await invalidateReviewPortal(token);
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function invalidateReviewPortal(token: string) {
  try {
    const { error } = await db
      .from("review_portal")
      .delete()
      .eq("valid_token", token);

    if (error) throw error;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// ====================================== Reviews  ======================================

export interface Review {
  rating: number; // 1-5
  description: string;
  reviewerName?: string;
  client_ref: string;
  // created_at: string;
}

export async function getReviews(): Promise<Review[] | null> {
  try {
    const { data, error } = await db.from("reviews").select("*");

    if (error) throw error;

    return data.map((item: Review) => ({
      ...item,
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
