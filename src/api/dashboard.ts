import { db, MetaData } from "./db";

export type Status =  "active" | "inactive" | "pending"

export interface Repo {
  repository_url: string;
  status: Status;
  contributors: number;
  description: string;
  title: string;
  public: boolean
}

export async function getRepos(): Promise<(Repo & MetaData)[] | null> {
  try {
    const { data, error } = await db.from("repos").select("*");

    if (error) throw error;

    return data as (Repo & MetaData)[];
  } catch (er) {
    console.error("failed to get repos:", er);
    return null;
  }
}


export async function getRepo(id: string): Promise<Repo & MetaData|null> {
  try {
    const { data, error } = await db.from("repos").select("*").eq("id", id).single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Failed got fetch repo", error);
    return null;
  }
}

export async function createRepo(
  newData: Repo
) {
  try {
    const { data, error } = await db.from("repos").insert({
      ...newData
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Failed to create,", error);
    return null;
  }
}

// export async function updateRepo(
//   id: string,
//   data: {
//     title: string | null;
//     description: string | null;
//     repository_url: string | null;
//     status: "active" | "inactive" | "pending" | null;
//   }
// ) {
//   let repo = await getRepo(id);

//   if (!repo) return null;

//   repo = {
//     ...repo,
//     ...data,
//   };

//   return null;
// }
// TODO: implement a fetch to the netlify edge function that will have access to the GITHUB_RELEASE_TOKEN
// export async function downloadRelease(id: string, repository_urlrl: string) {
// try {
//   } catch (error) {
//     console.error(error);
//   }
// }
