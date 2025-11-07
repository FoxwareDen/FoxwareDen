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

export async function getRepo(id: string) {
  try {
    const { data, error } = await db.from("repos").select("*").eq("id", id);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Failed got fetch repo", error);
    return null;
  }
}

export async function crateRepo(
  title: string,
  description: string,
  download_url: string,
  status: "active" | "inactive" | "pending"
) {
  try {
    const { data, error } = await db.from("repos").insert({
      title,
      description,
      download_url,
      status,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Failed to create,", error);
    return null;
  }
}

export async function updateRepo(
  id: string,
  data: {
    title: string | null;
    description: string | null;
    download_url: string | null;
    status: "active" | "inactive" | "pending" | null;
  }
) {
  let repo = await getRepo(id);

  if (!repo) return null;

  repo = {
    ...repo,
    ...data,
  };

  return null;
}
// TODO: implement a fetch to the netlify edge function that will have access to the GITHUB_RELEASE_TOKEN
// export async function downloadRelease(id: string, download_url: string) {
// try {
//   } catch (error) {
//     console.error(error);
//   }
// }
