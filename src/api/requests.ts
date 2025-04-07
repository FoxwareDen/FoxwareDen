const URL = "/.netlify/functions";

export async function heathCheck(): Promise<[boolean, string]> {
  const response = await fetch(`${URL}/heathcheck`);

  const res = await response.json();
  if (response.ok) {
    return [false, res.message];
  } else {
    return [true, res.message];
  }
}

export type OrgMetaData = {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  twitter_username: boolean;
  is_verified: boolean;
  has_organization_projects: boolean;
  has_repository_projects: boolean;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
  updated_at: string;
  archived_at: null;
  type: string;
};

export async function getOrgMetaData() {
  const response = await fetch(`${URL}/getOrgData`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<OrgMetaData & { message: string }>;
}
