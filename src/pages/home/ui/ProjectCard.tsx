import { Star, GitFork, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  color: string;
}

export default function ProjectCard({
  title,
  description,
  language,
  stars,
  forks,
  url,
  color,
}: ProjectCardProps) {
  return (
    <div className="rounded-none border-4 border-black dark:border-white overflow-hidden group hover:translate-x-1 hover:-translate-y-1 transition-transform bg-white dark:bg-black">
      <div className="h-2" style={{ backgroundColor: color }}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold font-mono">{title}</h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: color }}
            ></span>
            <span className="text-sm font-medium">{language}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1" />
              <span className="text-sm">{stars}</span>
            </div>
            <div className="flex items-center">
              <GitFork className="h-4 w-4 mr-1" />
              <span className="text-sm">{forks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
