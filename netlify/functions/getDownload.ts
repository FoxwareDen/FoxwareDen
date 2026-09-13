import { Context } from "@netlify/functions";

const SUPPORTED_EXTENSIONS = [".msi", ".exe", ".apk"];

type ReleaseAsset = {
  id: number;
  name: string;
  size: number;
  url: string;
  content_type: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async (req: Request, context: Context): Promise<Response> => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const querys = new URL(req.url).searchParams;

  if (!GITHUB_TOKEN) {
    return json({ message: "GITHUB_TOKEN is not set" }, 500);
  }

  const title = querys.get("title");
  if (!title) {
    return json({ message: "title search param not included" }, 400);
  }

  const githubHeaders = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    "User-Agent": "Netlify-Function",
    Accept: "application/vnd.github+json",
  };
  const releaseRes = await fetch(
    `https://api.github.com/repos/FoxwareDen/${encodeURIComponent(title)}/releases/latest`,
    { headers: githubHeaders }
  );

  if (!releaseRes.ok) {
    const text = await releaseRes.text();
    return json({ message: `GitHub release fetch failed: ${text}` }, releaseRes.status);
  }

  const release = (await releaseRes.json()) as { assets: ReleaseAsset[] };
  const assets = release.assets.filter((asset) =>
    SUPPORTED_EXTENSIONS.some((extension) => asset.name.toLowerCase().endsWith(extension))
  );
  const assetId = querys.get("asset");

  if (!assetId) {
    return json({
      assets: assets.map(({ id, name, size, content_type }) => ({
        id,
        name,
        size,
        content_type,
        download_url: `/.netlify/functions/getDownload?title=${encodeURIComponent(title)}&asset=${id}`,
      })),
    });
  }

  const asset = assets.find(({ id }) => String(id) === assetId);
  if (!asset) return json({ message: "Supported release asset not found" }, 404);

  const assetRes = await fetch(asset.url, {
    headers: { ...githubHeaders, Accept: "application/octet-stream" },
  });
  if (!assetRes.ok) return json({ message: "GitHub asset download failed" }, assetRes.status);

  return new Response(assetRes.body, {
    status: 200,
    headers: {
      "Content-Type": asset.content_type || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${asset.name.replace(/[\"\r\n]/g, "_")}"`,
      "Content-Length": String(asset.size),
      "Cache-Control": "private, no-store",
    },
  });
};
