import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import Loading from "../../ui/Loading";
import NotFound from "../404/Page";
import { Download, Sparkles, Zap, Shield } from "lucide-react";
import { DownloadAsset, getDownload, getProducts, Product } from "../../api/requests";

export default function Products() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productsData, setProductsData] = useState<Record<string, Product>>({});

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const results = await getProducts();

        const products = results.reduce(
          (prev: Record<string, Product>, curr: Product) => {
            prev[curr.title.trim().toLowerCase()] = curr;
            return prev;
          },
          {}
        );

        setProductsData(products);
      } catch (error) {
        console.error("Failed to load GitHub products:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const product = productsData[pathname.replace(/^\/+|\/+$/g, "").toLowerCase()];

  if (pathname === "/products") {
    return <ProductIndex loading={loading} error={error} products={Object.values(productsData)} />;
  }

  return (
    <>
      {loading ? (
        <div className="min-h-[340px] py-20">
          <Loading text="getting route" size="full" />
        </div>
      ) : error ? (
        <div className="min-h-[340px] py-20 text-center">
          <p className="text-muted-foreground">Products are temporarily unavailable.</p>
        </div>
      ) : product ? (
        <Page repo={product} />
      ) : (
        <NotFound />
      )}
    </>
  );
}

function ProductIndex({
  loading,
  error,
  products,
}: {
  loading: boolean;
  error: boolean;
  products: Product[];
}) {
  if (loading) {
    return (
      <div className="min-h-[340px] py-20">
        <Loading text="getting products" size="full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[340px] py-20 text-center">
        <p className="text-muted-foreground">Products are temporarily unavailable.</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mb-10">
        <p className="mb-2 font-mono text-sm uppercase tracking-widest text-vibrant-teal">
          FoxwareDen releases
        </p>
        <h1 className="text-4xl font-bold font-mono text-foreground">Products</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.title}
            to={`/${product.title.trim().toLowerCase()}`}
            className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl border border-vibrant-purple/30 bg-gradient-to-br from-vibrant-purple/15 via-card to-vibrant-teal/15 p-6 shadow-lg shadow-vibrant-purple/10 transition duration-300 hover:-translate-y-1 hover:border-vibrant-pink/60 hover:shadow-xl hover:shadow-vibrant-pink/20"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-vibrant-purple via-vibrant-pink to-vibrant-amber" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-vibrant-purple/10 blur-3xl transition group-hover:bg-vibrant-teal/15" />
            <div className="relative flex flex-1 flex-col">
              <div className="mb-5">
                <span className="inline-block rounded-full bg-vibrant-teal px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                  Status: {product.status}
                </span>
              </div>

              <h2 className="mb-4 text-4xl font-bold leading-tight font-mono text-transparent bg-gradient-to-r from-vibrant-purple via-vibrant-pink to-vibrant-amber bg-clip-text transition-transform group-hover:scale-[1.02]">
                {product.title}
              </h2>

              {product.release_tag && (
                <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-vibrant-purple">
                  Release {product.release_tag}
                </p>
              )}

              <p className="line-clamp-3 text-base leading-6 text-muted-foreground">
                {getShortDescription(product.description)}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-vibrant-purple/10 px-3 py-1.5 font-mono text-xs font-medium text-vibrant-purple">
                  Fast
                </span>
                <span className="rounded-full bg-vibrant-teal/10 px-3 py-1.5 font-mono text-xs font-medium text-vibrant-teal">
                  Secure
                </span>
                <span className="rounded-full bg-vibrant-amber/10 px-3 py-1.5 font-mono text-xs font-medium text-vibrant-amber">
                  Modern
                </span>
              </div>

              <span className="mt-auto pt-6 text-sm font-bold text-vibrant-purple">
                View product <span aria-hidden="true">-&gt;</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function getShortDescription(markdown: string) {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/[#>*_`~\[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.length > 150
    ? `${plainText.slice(0, 147).trimEnd()}...`
    : plainText;
}

function Page({ repo }: { repo: Product }) {
  const [assets, setAssets] = useState<DownloadAsset[]>([]);
  const [downloadLoading, setDownloadLoading] = useState(true);
  const colors: Record<Product["status"], string> = {
    active: "bg-vibrant-teal text-white",
    inactive: "bg-vibrant-pink text-white",
    // pending: "bg-vibrant-amber text-white",
  };

  const { statusColor } = useMemo(
    () => ({
      statusColor: colors[repo.status],
    }),
    [repo.status]
  );

  useEffect(() => {
    getDownload(repo.title)
      .then(setAssets)
      .catch((error) => console.error("Failed to load downloads:", error))
      .finally(() => setDownloadLoading(false));
  }, [repo.title]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-16 md:py-24 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-vibrant-purple/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-vibrant-teal/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        
        <div className="relative grid md:grid-cols-2 gap-12 items-center my-20">
          {/* Left side - Text content */}
          <div className="space-y-6 animate-fade-in-left">
            <div
              className={`inline-block px-4 py-2 rounded-full ${statusColor} shadow-lg`}
            >
              <span className="font-mono text-sm font-bold uppercase tracking-wide">
                Status: {repo.status}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance text-foreground">
              <span className="bg-gradient-to-r from-vibrant-purple via-vibrant-pink to-vibrant-amber bg-clip-text text-transparent">
                {repo.title}
              </span>
            </h1>

            {repo.release_tag && (
              <p className="font-mono text-sm font-bold uppercase tracking-widest text-vibrant-purple">
                Latest release: {repo.release_tag}
              </p>
            )}

            <div
              className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: repo.readmeHtml || repo.description }}
            />

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-vibrant-purple/10 text-vibrant-purple rounded-full">
                <Zap className="w-4 h-4" />
                <span className="font-mono text-sm font-medium">Fast</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-vibrant-teal/10 text-vibrant-teal rounded-full">
                <Shield className="w-4 h-4" />
                <span className="font-mono text-sm font-medium">Secure</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-vibrant-amber/10 text-vibrant-amber rounded-full">
                <Sparkles className="w-4 h-4" />
                <span className="font-mono text-sm font-medium">Modern</span>
              </div>
            </div>
          </div>

          {/* Right side - Product image */}
          <div className="relative hidden md:block animate-fade-in-right">
            {/* Layered card effect */}
            <div className="absolute -inset-4 bg-gradient-to-br from-vibrant-purple to-vibrant-pink rounded-2xl rotate-3 opacity-80" />
            <div className="absolute -inset-2 bg-gradient-to-br from-vibrant-teal to-vibrant-blue rounded-2xl -rotate-2 opacity-60" />
            <div className="min-h-[350px] relative bg-card border border-foreground/10 rounded-2xl p-8 shadow-2xl">
              <img
                src="/minimalist-software-interface-screenshot-with-code.jpg"
                alt="Product Screenshot"
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Floating decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-vibrant-blue rounded-xl shadow-lg animate-float -rotate-12 flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-vibrant-amber rounded-full shadow-lg animate-float flex items-center justify-center" style={{ animationDelay: "0.5s" }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="relative animate-scale-in">
          {/* Background decorative elements */}
          <div className="absolute -top-8 left-1/4 w-32 h-32 bg-vibrant-amber/30 rounded-full blur-2xl animate-pulse-glow" />
          <div className="absolute -bottom-8 right-1/4 w-24 h-24 bg-vibrant-blue/30 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

          {/* CTA Content */}
          <div className="relative bg-gradient-to-br from-vibrant-purple via-vibrant-pink to-vibrant-amber p-[2px] rounded-3xl">
            <div className="bg-card rounded-3xl p-12 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Ready to Get Started?
              </h2>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground">
                Download now and join our mission to equip the future
              </p>

              {downloadLoading ? (
                <Loading text="loading downloads" size="lg" />
              ) : assets.length ? (
                <div className="flex flex-wrap justify-center gap-3">
                  {assets.map((asset) => (
                    <a
                      key={asset.id}
                      href={asset.download_url}
                      className="group inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-vibrant-purple to-vibrant-pink text-white rounded-xl font-mono font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <Download className="w-5 h-5 group-hover:animate-bounce-subtle" />
                      Download {asset.name}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No MSI, EXE, or APK release found.</p>
              )}

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap justify-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-vibrant-teal" />
                  <span className="text-sm">Secure Download</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-vibrant-amber" />
                  <span className="text-sm">Fast Installation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-vibrant-purple" />
                  <span className="text-sm">Regular Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
