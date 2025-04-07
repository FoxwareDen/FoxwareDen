import type { Context } from "@netlify/functions";

const ORGANIZATION_URL = "https://api.github.com/orgs/foxwareden";

export default async (_req: Request, _context: Context): Promise<Response> => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return new Response(
      JSON.stringify({
        message: "GITHUB_TOKEN is not set",
      }),
      { status: 500 }
    );
  }

  const res = await fetch(ORGANIZATION_URL, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ message: res.statusText }), {
      status: 500,
    });
  }

  const data = await res.json();

  if (!data) {
    return new Response(JSON.stringify({ message: "no data" }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({ message: "everything's normal", ...data }),
    {
      status: 200,
    }
  );
};
