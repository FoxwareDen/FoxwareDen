import { useEffect, useState } from "react";
import TechStack from "./TechStack";
import { useOrg } from "../../../store/orgHook";
import { getWithAuth, Repo } from "../../../api/requests";
import Loading from "../../../ui/Loading";
import ErrorSection from "../../../ui/ErrorSection";

type TechStack = {
  technology: string;
  color: string;
};

function TechnologyStacksSection() {
  const colors = [
    "#4A9DFF",
    "#FF5252",
    "#FFD60A",
    "#4CAF50",
    "#9C27B0",
    "#FF9800",
  ];

  const { loading, orgData } = useOrg();
  const [techStacksLoading, setTechStacksLoading] = useState(false);
  const [techStacksError, setTechStacksError] = useState<string | null>(null);
  const [techStacks, setTechStacks] = useState<TechStack[] | null>(null);

  useEffect(() => {
    const fetchRepoTechStack = async () => {
      if (loading) return;
      if (!orgData?.repos_url) return;
      try {
        setTechStacksLoading(true);
        setTechStacksError(null);
        const [res, error] = await getWithAuth<{
          message: string;
          data: Repo[];
        }>(orgData.repos_url);

        if (error) throw new Error(error);
        if (!res) return;

        const topics: string[] = [];

        for (const repo of res.data) {
          topics.push(...repo.topics);
        }

        // reduce clones
        const filteredTopics = topics.reduce((prev: string[], curr: string) => {
          if (prev.includes(curr)) {
            return prev;
          } else if (!["native-apps", "website"].includes(curr)) {
            return [...prev, curr];
          } else {
            return prev;
          }
        }, []);

        let counter = 0;
        const techStacksWithColor = filteredTopics.map((technology) => {
          counter + 1 == colors.length ? (counter = 0) : counter++;
          const color = colors[counter];
          return {
            technology,
            color,
          } as TechStack;
        });

        setTechStacks(techStacksWithColor);
      } catch (error) {
        console.error(error);
        setTechStacksError(`${error}`);
      } finally {
        setTechStacksLoading(false);
      }
    };

    fetchRepoTechStack();
  }, [loading]);

  return (
    <section className="px-4 py-16 md:py-24 bg-black text-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold font-mono mb-12">
          TECH STACKS
        </h2>

        {techStacksLoading || techStacks == null ? (
          <>
            <Loading text="Loading TechStacks" mode="light" />
          </>
        ) : techStacksError ? (
          <>
            <ErrorSection message={techStacksError} type="error" />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {techStacks.map((techStack, index) => (
              <TechStack
                key={index}
                technology={techStack.technology}
                color={techStack.color}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TechnologyStacksSection;

/* TODO: updated design maybe?

<section className="container mx-auto px-4 py-20 border-t-4 border-black dark:border-white">
        <h2 className="font-mono text-4xl md:text-5xl font-bold mb-12 -rotate-1">
          [TECH STACK]
        </h2>
        <div className="max-w-5xl">
          <p className="font-mono text-lg mb-8 leading-relaxed">
            We use next-generation technologies to build fast, reliable, and
            scalable applications:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="border-4 border-black dark:border-white p-6 text-center bg-white dark:bg-black">
              <div className="w-full h-1 bg-cyan-400 mb-4" />
              <p className="font-mono text-lg font-bold">REACT</p>
            </div>

            <div className="border-4 border-black dark:border-white p-6 text-center bg-white dark:bg-black">
              <div className="w-full h-1 bg-black dark:bg-white mb-4" />
              <p className="font-mono text-lg font-bold">NEXT.JS</p>
            </div>

            <div className="border-4 border-black dark:border-white p-6 text-center bg-white dark:bg-black">
              <div className="w-full h-1 bg-yellow-400 mb-4" />
              <p className="font-mono text-lg font-bold">TAURI</p>
            </div>

            <div className="border-4 border-black dark:border-white p-6 text-center bg-white dark:bg-black">
              <div className="w-full h-1 bg-orange-600 mb-4" />
              <p className="font-mono text-lg font-bold">RUST</p>
            </div>

            <div className="border-4 border-black dark:border-white p-6 text-center bg-white dark:bg-black">
              <div className="w-full h-1 bg-cyan-500 mb-4" />
              <p className="font-mono text-lg font-bold">GO</p>
            </div>

            <div className="border-4 border-black dark:border-white p-6 text-center bg-white dark:bg-black">
              <div className="w-full h-1 bg-blue-600 mb-4" />
              <p className="font-mono text-lg font-bold">TYPESCRIPT</p>
            </div>

            <div className="border-4 border-black dark:border-white p-6 text-center bg-white dark:bg-black">
              <div className="w-full h-1 bg-teal-500 mb-4" />
              <p className="font-mono text-lg font-bold">TAILWIND</p>
            </div>

            <div className="border-4 border-black dark:border-white p-6 text-center bg-white dark:bg-black">
              <div className="w-full h-1 bg-blue-500 mb-4" />
              <p className="font-mono text-lg font-bold">POSTGRES</p>
            </div>
          </div>
        </div>
      </section>
*/
