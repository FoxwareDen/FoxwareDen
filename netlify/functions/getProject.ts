import type { Context } from "@netlify/functions";


const ORGANIZATION_URL = "https://api.github.com/orgs/foxwareden";

export default async (req:Request, context: Context): Promise<Response> => {
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

  const title = querys.get("title");

  if (!title) {
    return new Response("", {
      status: 400,
      statusText: "url search param not included",
    });
  }

  let res = await fetch(ORGANIZATION_URL, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
  });

  if (!res.ok)
    return new Response("", {
      status: 500,
      statusText: "failed fetch request",
    });

  const url = (await res.json()).repos_url

  res = await fetch(url, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
  });

  const repos = await res.json();

  if (!Array.isArray(repos)) {
    return new Response(
      JSON.stringify({message: "failed to parse repos response"}),{
        status: 500,
        statusText: "Failed to parse repos response"
      }
    )
  }
  

  const repo = repos.filter((r:{name:string})=> r.name.toLocaleLowerCase()==title.toLocaleLowerCase()    
  )[0]

  return new Response(
    JSON.stringify({ message: "everything's normal", repo }),{
    status: 200,
    statusText: "url search param not included",
  });
}