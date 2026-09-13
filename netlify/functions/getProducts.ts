import type { Handler } from "@netlify/functions";

const ORGANIZATION = "FoxwareDen";
const GITHUB_API = "https://api.github.com";

type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  default_branch: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
};

type GithubRelease = {
  tag_name: string;
};

function githubHeaders(token: string, accept = "application/vnd.github+json") {
  return {
    Authorization: `Bearer ${token}`,
    Accept: accept,
    "User-Agent": "FoxwareDen-Netlify-Function",
  };
}

function json(data: unknown, statusCode = 200) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}

export const handler: Handler = async () => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return json({ message: "GITHUB_TOKEN is not set" }, 500);

  try {
    const reposResponse = await fetch(
      `${GITHUB_API}/orgs/${ORGANIZATION}/repos?per_page=100&sort=updated`,
      { headers: githubHeaders(token) }
    );

    if (!reposResponse.ok) {
      return json(
        { message: `GitHub repository request failed: ${reposResponse.statusText}` },
        reposResponse.status
      );
    }

    const repos = (await reposResponse.json()) as GithubRepo[];
    const products = await Promise.all(
      repos
        .filter(
          (repo) => repo.topics.some((topic) => topic === "release")
        )
        .map(async (repo) => {
        let releaseTag: string | null = null;
        const releaseResponse = await fetch(
          `${GITHUB_API}/repos/${ORGANIZATION}/${encodeURIComponent(repo.name)}/releases/latest`,
          { headers: githubHeaders(token) }
        );

        if (releaseResponse.ok) {
          const release = (await releaseResponse.json()) as GithubRelease;
          releaseTag = release.tag_name;
        }

        let readme = "";
        const readmeResponse = await fetch(
          `${GITHUB_API}/repos/${ORGANIZATION}/${encodeURIComponent(repo.name)}/readme`,
          { headers: githubHeaders(token, "application/vnd.github.raw+json") }
        );

        if (readmeResponse.ok) readme = await readmeResponse.text();

        let readmeHtml = "";
        if (readme) {
          const markdownResponse = await fetch(`${GITHUB_API}/markdown`, {
            method: "POST",
            headers: {
              ...githubHeaders(token),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: readme,
              mode: "gfm",
              context: repo.full_name,
            }),
          });

          if (markdownResponse.ok) readmeHtml = await markdownResponse.text();
        }

        return {
          id: repo.id,
          title: repo.name,
          description: readme || repo.description || "No description available.",
          repository_url: repo.html_url,
          public: !repo.private,
          status: repo.archived ? "inactive" : "active",
          contributors: 0,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || "Unknown",
          readmeHtml,
          release_tag: releaseTag,
        };
        })
    );

    return json({ products: products.filter((product) => product !== null) });
  } catch (error) {
    console.error("[getProducts] failed to load organization products", error);
    return json({ message: "Failed to load organization products" }, 500);
  }
};
