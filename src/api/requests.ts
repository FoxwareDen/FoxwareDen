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

export type User = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
};

export interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  User: User;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: null | string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string[] | string;
  has_issues: true;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: boolean;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: null | string;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: "public" | "private";
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export async function getRepos(url: string, page = 0) {
  const response = await fetch(
    `${URL}/getProjects?url=${url}&page=${page + 1}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<{
    repos: Repo[];
    message: string;
  }>;
}

export async function getWithAuth<T>(
  url: string
): Promise<[T | null, string | null]> {
  try {
    const response = await fetch(`${URL}/getWithAuth?url=${url}`);

    if (!response.ok) throw Error("failed fetch request");

    const data = await response.json();

    return [data as T, null];
  } catch (error) {
    return [null, `${error}`];
  }
}
