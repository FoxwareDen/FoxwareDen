import { createClient, Session, User } from "@supabase/supabase-js";

export const db = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

export interface MetaData {
  id: number,
  created_at: string
}

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

export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ user: User; session: Session } | null> {
  try {
    const allowedUser = await getAllowedList();

    if (!allowedUser) throw new Error("Failed to get allowed list");
    if (!allowedUser.includes(email)) throw new Error("Not allowed user");

    // Try to sign in first
    const { data, error: signInError } = await db.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) throw signInError;

    // Signed in successfully
    return data;
  } catch (er) {
    console.error("Failed to sign in:", er);
    return null;
  }
}

export async function signUpWithEmail(
  email: string,
  password: string
): Promise<{ user: User | null; session: Session | null } | null> {
  try {
    const allowedUser = await getAllowedList();

    if (!allowedUser) throw new Error("Failed to get allowed list");
    if (!allowedUser.includes(email)) throw new Error("Not allowed user");

    const { data, error: signUpError } = await db.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    if (data.user) await createUserData(data.user.id);

    return data;
  } catch (er) {
    console.error("Failed to  sign up", er);
    return null;
  }
}

export async function signOutUser() {
  try {
    const { error } = await db.auth.signOut();

    if (error) {
      throw error;
    }

    console.log(await db.auth.getSession());

    return true;
  } catch (error) {
    console.error("Failed to sign out:", error);
    return false;
  }
}

export interface UserData {
  user_id: string;
  role: string;
}

export async function createUserData(user_id: string) {
  try {
    const { error } = await db.from("user_data").insert({
      user_id,
      role: "new-user",
    });

    if (error) throw error;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
