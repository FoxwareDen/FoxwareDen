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

  if (!url) {
    return new Response("", {
      status: 400,
      statusText: "url search param not included",
    });
  }

  const builtUrl = `${url}?page=${page}`;

  const res = await fetch(builtUrl, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
  });

  if (!res.ok) {
    return new Response("", {
      status: 500,
      statusText: "failed fetch request to github API",
    });
  }

  const data = await res.json();

  return new Response(
    JSON.stringify({ message: "everything's normal", repos: data }),
    {
      status: 200,
      statusText: "success",
    }
  );
};
