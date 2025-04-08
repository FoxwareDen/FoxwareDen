import { Star, GitFork, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { getWithAuth } from "../../../api/requests";

type User = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  role_name: "read" | "write" | "admin";
};

export type ProjectCardProps = {
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  color: string;
  // ops
  languages_url?: string;
};

export default function ProjectCard({
  title,
  description,
  language,
  stars,
  forks,
  url,
  color,
  // ops
  contributors_url,
  languages_url,
}: ProjectCardProps) {
  const [colabs, setColabs] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchColabs = async () => {
      if (!contributors_url) return;
      const colabUrl = contributors_url?.split("{")[0];

      const [data, error] = await getWithAuth<{
        message: string;
        data: any[];
      }>(colabUrl);

      if (!data) return;

      const colabs = data.data;

      const users: User[] = colabs.filter((user) => {
        return (
          user.role_name.toLowerCase() === "write" ||
          user.role_name.toLowerCase() === "admin"
        );
      });

      setColabs(users);
    };
    fetchColabs();
  }, []);

  return (
    <div className="rounded-none border-4 border-black dark:border-white overflow-hidden group hover:translate-x-1 hover:-translate-y-1 transition-transform bg-white dark:bg-black">
      <div className="h-2" style={{ backgroundColor: color }}></div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold font-mono">{title}</h3>
          <span className="text-sm font-medium">{language}</span>
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
          <div className="flex items-center overflow-x-auto">
            {/* users here */}
            {colabs != null &&
              colabs.map((user) => (
                <a
                  key={user.id}
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors "
                >
                  <img
                    className="h-5 rounded-lg mr-1"
                    src={user.avatar_url}
                    alt=""
                  />
                  <span className="text-sm font-medium">{user.login}</span>
                </a>
              ))}
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
