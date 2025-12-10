import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { getRepos, Repo, Status } from "../../api/dashboard";
import Loading from "../../ui/Loading";
import NotFound from "../404/Page";
import { Download } from "lucide-react";
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
    active: "bg-green-400",
    inactive: "bg-rose-400",
    pending: "bg-yellow-500",
  };

  const { statusColor } = useMemo(
    () => ({
      statusColor: colors[repo.status],
    }),
    [repo.status]
  );
  // const [repoData, setRepoData]= useState<Repo|null>(null)

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const data = await getProject(repo.title.toLocaleLowerCase());

        console.log("repo page", data);

        // setRepoData(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepoData();
  }, []);

  const handleDownload = async () => {
    try {
      const apk = await getDownload(repo.title);
      // Open direct browser download for large files
      window.open(apk.download_url, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center my-20">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div
              className={`inline-block px-4 py-2 text-black rotate-2 ${statusColor}`}
            >
              <span className="font-mono text-xl font-bold">
                Status: {repo.status}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance">
              {repo.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {repo.description}
            </p>

            {/* META DATA BLOCKS */}
            <div className="flex flex-wrap gap-4 pt-4">
              {/* Block */}
              {/* <div className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white">
                <span className="font-mono font-bold">SIZE</span>
              </div> */}
              {/* Block */}
              {/* <div className="px-4 py-2 border-2 border-black dark:border-white">
                <span className="font-mono">open_issues</span>
              </div> */}
              {/* Block */}
              {/* <div className="px-4 py-2 border-2 border-black dark:border-white">
                <span className="font-mono">15K+ STARS</span>
              </div> */}
            </div>
          </div>

          {/* TODO:Right side - Product image */}
          <div className="relative hidden md:block">
            <div className="absolute -inset-4 bg-red-500 rotate-3 border-4 border-black dark:border-white"></div>
            <div className="min-h-[350px] relative bg-black dark:bg-white border-4 border-black dark:border-white p-8 rotate-1">
              <img
                src="/minimalist-software-interface-screenshot-with-code.jpg"
                alt="Product Screenshot"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500 border-4 border-black dark:border-white -rotate-12"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 border-4 border-black dark:border-white rotate-45"></div>
          </div>
        </div>
      </section>

      {/* Status Table Section */}
      {/* <section className="container mx-auto px-4 py-16">
        <div className="border-4 border-black dark:border-white bg-white dark:bg-black">
          <div className="bg-black dark:bg-white text-white dark:text-black px-6 py-4 border-b-4 border-black dark:border-white">
            <h2 className="text-2xl font-bold font-mono">SYSTEM STATUS</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full font-mono">
              <thead>
                <tr className="border-b-4 border-black dark:border-white">
                  <th className="text-left px-6 py-4 font-bold">SERVICE</th>
                  <th className="text-left px-6 py-4 font-bold">STATUS</th>
                  <th className="text-left px-6 py-4 font-bold">UPTIME</th>
                  <th className="text-left px-6 py-4 font-bold">RESPONSE TIME</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900">
                  <td className="px-6 py-4">API Server</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-bold">OPERATIONAL</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">99.99%</td>
                  <td className="px-6 py-4">24ms</td>
                </tr>
                <tr className="border-b-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900">
                  <td className="px-6 py-4">Database</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-bold">OPERATIONAL</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">99.97%</td>
                  <td className="px-6 py-4">12ms</td>
                </tr>
                <tr className="border-b-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900">
                  <td className="px-6 py-4">CDN</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-bold">OPERATIONAL</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">99.98%</td>
                  <td className="px-6 py-4">8ms</td>
                </tr>
                <tr className="border-b-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900">
                  <td className="px-6 py-4">Authentication</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <span className="font-bold">MAINTENANCE</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">99.95%</td>
                  <td className="px-6 py-4">45ms</td>
                </tr>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-900">
                  <td className="px-6 py-4">WebSocket</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-bold">OPERATIONAL</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">99.96%</td>
                  <td className="px-6 py-4">18ms</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-950 border-t-4 border-black dark:border-white">
            <div className="flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4" />
              <span>Last updated: 2 minutes ago</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Download CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute -top-8 left-1/4 w-32 h-32 bg-yellow-400 border-4 border-black dark:border-white rotate-12 opacity-50"></div>
          <div className="absolute -bottom-8 right-1/4 w-24 h-24 bg-blue-500 border-4 border-black dark:border-white -rotate-12 opacity-50"></div>

          {/* CTA Content */}
          <div className="relative bg-black dark:bg-white text-white dark:text-black border-4 border-black dark:border-white p-12 text-center -rotate-1">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              READY TO GET STARTED?
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
              Download now and join our mission of to equip the future
            </p>

            <button
              aria-label="download button"
              onClick={handleDownload}
              className="group relative inline-flex items-center gap-3 px-12 py-6 bg-white dark:bg-black text-black dark:text-white border-4 border-black dark:border-white font-mono text-xl font-bold hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-400 transition-all hover:scale-105"
            >
              <Download className="w-6 h-6" />
              DOWNLOAD NOW
            </button>

            {/* <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <span className="px-4 py-2 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white">
                WINDOWS
              </span>
              <span className="px-4 py-2 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white">
                MACOS
              </span>
              <span className="px-4 py-2 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white">
                LINUX
              </span>
              <span className="px-4 py-2 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white">
                DOCKER
              </span>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
