import { db } from "./db";

export interface Repo {
  download_url: string;
  status: "active" | "inactive" | "pending";
  contributors: number;
  description: string;
  title: string;
}

export async function getRepos(): Promise<Repo[] | null> {
  try {
    const { data, error } = await db.from("repos").select("*");

    if (error) throw error;

    return data;
  } catch (er) {
    console.error("failed to get repos:", er);
    return null;
  }
}

export async function downloadRelease(id: string, download_url: string) {
  try {
    // TODO: implement a fetch to the netlify edge function that will have access to the GITHUB_RELEASE_TOKEN
  } catch (error) {
    console.error(error);
  }
}
