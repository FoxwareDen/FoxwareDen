import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context): Promise<Response> => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return new Response(
      JSON.stringify({
        message: "GITHUB_TOKEN is not set",
      }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ message: "everything's normal" }), {
    status: 200,
  });
};
