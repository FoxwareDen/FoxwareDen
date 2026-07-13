import { GitForkIcon } from "lucide-react";

interface MemberCardProps {
  name: string;
  role: string;
  image: string;
  github: string;
}

export default function MemberCard({
  name,
  role,
  image,
  github,
}: MemberCardProps) {
  return (
    <div className="rounded-none border-4 border-black dark:border-white overflow-hidden group hover:translate-x-1 hover:-translate-y-1 transition-transform bg-white dark:bg-black">
      <div className="relative bg-black">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="w-full rounded-full aspect-square object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-black-600 dark:text-gray-400 text-sm">
              Role:{role}
            </p>
          </div>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <GitForkIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
