import type { Context } from "@netlify/functions";

export default async (req: Request, _context: Context): Promise<Response> => {
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

  if (!url) {
    return new Response("", {
      status: 400,
      statusText: "url search param not included",
    });
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
  });

  if (!res.ok)
    return new Response("", {
      status: 500,
      statusText: "failed fetch request",
    });

  const data = await res.json();

  return new Response(JSON.stringify({ message: "", data }), {
    statusText: "success",
    status: 200,
  });
};
