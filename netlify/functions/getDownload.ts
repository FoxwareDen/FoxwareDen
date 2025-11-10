import { Context } from "@netlify/functions";

export default async (req: Request, context: Context): Promise<Response> => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const querys = new URLSearchParams(req.url.split("?")[1]);

  if (!GITHUB_TOKEN) {
    return new Response(JSON.stringify({ message: "GITHUB_TOKEN is not set" }), { status: 500 });
  }

  const title = querys.get("title");
  if (!title) {
    return new Response("", { status: 400, statusText: "url search param not included" });
  }

  const releaseRes = await fetch(`https://api.github.com/repos/FoxwareDen/${title}/releases/latest`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "Netlify-Edge-Function",
      Accept: "application/vnd.github+json",
    },
  });

  if (!releaseRes.ok) {
    const text = await releaseRes.text();
    return new Response(`GitHub release fetch failed: ${text}`, { status: releaseRes.status });
  }

  const release = await releaseRes.json();
  const apkAsset = release.assets.find((a: any) => a.name.endsWith(".apk"));

  if (!apkAsset) {
    return new Response(JSON.stringify({ message: "No APK asset found" }), { status: 404 });
  }

  // Return only the APK info (browser_download_url) instead of the file
  return new Response(JSON.stringify({
    name: apkAsset.name,
    size: apkAsset.size,
    download_url: apkAsset.browser_download_url
  }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
  });
};
