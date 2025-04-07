import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import ProjectCard from "./ProjectCard";
import { useState } from "react";

type Project = {
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  color: string;
};

function ProjectsSection() {
  // TODO: replace with actual data later in development
  const [projects, setProjects] = useState<Project[]>([
    {
      title: "DataSync",
      description:
        "A real-time database synchronization library with offline support.",
      language: "TypeScript",
      stars: 1247,
      forks: 342,
      url: "https://github.com/example/datasync",
      color: "#4A9DFF",
    },
    {
      title: "StaticGen",
      description:
        "Static site generator with built-in performance optimizations.",
      language: "JavaScript",
      stars: 892,
      forks: 156,
      url: "https://github.com/example/staticgen",
      color: "#FF5252",
    },
    {
      title: "AuthKit",
      description: "Authentication toolkit for modern web applications.",
      language: "TypeScript",
      stars: 2103,
      forks: 412,
      url: "https://github.com/example/authkit",
      color: "#FFD60A",
    },
    {
      title: "QueryBuilder",
      description: "Type-safe SQL query builder for Node.js applications.",
      language: "TypeScript",
      stars: 1568,
      forks: 203,
      url: "https://github.com/example/querybuilder",
      color: "#4CAF50",
    },
    {
      title: "UIFramework",
      description: "Minimal UI framework with accessibility built-in.",
      language: "JavaScript",
      stars: 3421,
      forks: 521,
      url: "https://github.com/example/uiframework",
      color: "#9C27B0",
    },
    {
      title: "DevTools",
      description: "Collection of developer tools for debugging and profiling.",
      language: "Rust",
      stars: 764,
      forks: 98,
      url: "https://github.com/example/devtools",
      color: "#FF9800",
    },
  ]);

  return (
    <section className="px-4 py-16 md:py-24 bg-[#F0F0F0] dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
              PROJECTS
            </h2>
            <p className="text-lg max-w-2xl">
              Our open-source projects are real software solutions that solve
              real-world problems.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* TODO: add stagger loading later */}
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              language={project.language}
              stars={project.stars}
              forks={project.forks}
              url={project.url}
              color={project.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
