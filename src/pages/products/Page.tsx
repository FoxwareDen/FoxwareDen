import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { getRepos, Repo, Status } from "../../api/dashboard";
import Loading from "../../ui/Loading";
import NotFound from "../404/Page";
import { Download, Sparkles, Zap, Shield } from "lucide-react";
import { getDownload, getProject } from "../../api/requests";

export default function Products() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<Record<string, Repo>>({});

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      const results = await getRepos();

      if (!results) return;

      const products = results.reduce(
        (prev: Record<string, Repo>, curr: Repo) => {
          const newData = prev;

          newData[curr.title.toLowerCase()] = curr;
          return newData;
        },
        {}
      );

      setProductsData(products);

      setLoading(false);
    };
    fetchRepos();
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-[340px] py-20">
          <Loading text="getting route" size="full" />
        </div>
      ) : productsData[pathname.replace("/", "")] ? (
        <Page repo={productsData[pathname.replace("/", "")]} />
      ) : (
        <NotFound />
      )}
    </>
  );
}

function Page({ repo }: { repo: Repo }) {
  const colors: Record<Status, string> = {
    active: "bg-vibrant-teal text-white",
    inactive: "bg-vibrant-pink text-white",
    pending: "bg-vibrant-amber text-white",
  };

  const { statusColor } = useMemo(
    () => ({
      statusColor: colors[repo.status],
    }),
    [repo.status]
  );

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const data = await getProject(repo.title.toLocaleLowerCase());
        console.log("repo page", data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepoData();
  }, []);

  const handleDownload = async () => {
    try {
      const apk = await getDownload(repo.title);
      window.open(apk.download_url, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed");
    }
  };

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

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {repo.description}
            </p>

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

              <button
                aria-label="download button"
                onClick={handleDownload}
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-vibrant-purple to-vibrant-pink text-white rounded-xl font-mono text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Download className="w-6 h-6 group-hover:animate-bounce-subtle" />
                Download Now
                <div className="absolute inset-0 bg-gradient-to-r from-vibrant-pink to-vibrant-amber opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10" />
              </button>

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
