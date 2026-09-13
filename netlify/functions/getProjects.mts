import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context): Promise<Response> => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const querys = new URLSearchParams(req.url.split("?")[1]);

  if (!GITHUB_TOKEN) {
    return new Response(
      JSON.stringify({
        message: "GITHUB_TOKEN is not set",
      }),
      { status: 500, statusText: "Token is not set" }
    );
  }

  const url = querys.get("url");
  const page = parseInt(querys.get("page") || "1", 10);

  console.log("[getProjects] request", {
    url,
    page,
    hasGithubToken: Boolean(GITHUB_TOKEN),
  });

  if (!url) {
    console.warn("[getProjects] missing url parameter");
    return new Response("", {
      status: 400,
      statusText: "url search param not included",
    });
  }

  const builtUrl = `${url}?page=${page}`;

  const res = await fetch(builtUrl, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
  });

  console.log("[getProjects] GitHub response", {
    status: res.status,
    ok: res.ok,
    page,
  });

  if (!res.ok) {
    console.error("[getProjects] GitHub repository request failed", {
      status: res.status,
      statusText: res.statusText,
    });
    return new Response("", {
      status: 500,
      statusText: "failed fetch request to github API",
    });
  }

  const data = await res.json();

  console.log("[getProjects] repositories received", {
    count: Array.isArray(data) ? data.length : null,
    responseType: Array.isArray(data) ? "array" : typeof data,
  });

  return new Response(
    JSON.stringify({ message: "everything's normal", repos: data }),
    {
      status: 200,
      statusText: "success",
    }
  );
};
