import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import ProjectCard from "./ProjectCard";
import { type ProjectCardProps } from "./ProjectCard";
import { useEffect, useState } from "react";
import { useOrg } from "../../../store/orgHook";
import Loading from "../../../ui/Loading";
import ErrorSection from "../../../ui/ErrorSection";
import { getRepos } from "../../../api/requests";

function ProjectsSection() {
  const colors = [
    "#4A9DFF",
    "#FF5252",
    "#FFD60A",
    "#4CAF50",
    "#9C27B0",
    "#FF9800",
  ];

  const { loading, orgData } = useOrg();
  // TODO: replace with actual data later in development
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectCardProps[] | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (loading || !orgData) return;
      try {
        setProjectsLoading(true);
        setProjectsError(null);

        let counter = 0;
        const repos = (await getRepos(orgData.repos_url)).repos.map((repo) => {
          counter + 1 == colors.length ? (counter = 0) : counter++;
          const color = colors[counter];

          return {
            color,
            title: repo.full_name,
            description: repo.description,
            forks: repo.forks,
            language: repo.language,
            stars: repo.stargazers_count,
            url: repo.html_url,
            // ops
            contributors_url: repo.collaborators_url,
            languages_url: repo.languages_url,
          } as ProjectCardProps;
        });

        setProjects(repos);
      } catch (error) {
        console.error(error);
        setProjectsError(`Failed to get projects list: ${error}`);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, [orgData, loading]);

  return (
    <>
      <>
        <section className="px-4 py-16 md:py-24 bg-[#F0F0F0] dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
                  PROJECTS
                </h2>
                <p className="text-lg max-w-2xl">
                  Our open-source projects are real software solutions that
                  solve real-world problems.
                </p>
              </div>
              {/* TODO: add link later */}
              <Link
                to="https://github.com/orgs/FoxwareDen/repositories"
                target="_blank"
                className="inline-flex items-center mt-4 md:mt-0 text-lg font-bold hover:underline"
              >
                View All Projects <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
            {projectsLoading || projects == null ? (
              <>
                <Loading text="Loading projects" />
              </>
            ) : projectsError ? (
              <>
                <ErrorSection message={projectsError} type="error" />
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* TODO: add stagger loading later */}
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            )}
          </div>
        </section>
      </>
    </>
  );
}

export default ProjectsSection;
