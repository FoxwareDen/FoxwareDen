import { createClient } from "@supabase/supabase-js";

export const db = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

export async function getAllowedList(): Promise<string[] | null> {
  try {
    const { data, error } = await db.from("allow_list").select("*");

    if (error) throw error;

    return data.map((item) => item.email);
  } catch (er) {
    console.error("failed to get Allowed list:", er);
    return null;
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const allowedUser = await getAllowedList();

    if (!allowedUser) throw new Error("Failed to get allowed list");
    if (!allowedUser.includes(email)) throw new Error("Not allowed user");

    // Try to sign in first
    const { error: signInError } = await db.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) throw signInError;

    // Signed in successfully
    return true;
  } catch (er) {
    console.error("Failed to sign in:", er);
    return false;
  }
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    const allowedUser = await getAllowedList();

    if (!allowedUser) throw new Error("Failed to get allowed list");
    if (!allowedUser.includes(email)) throw new Error("Not allowed user");

    const { error: signUpError } = await db.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    // Signed up successfully
    return true;
  } catch (er) {
    console.error("Failed to  sign up", er);
    return false;
  }
}
