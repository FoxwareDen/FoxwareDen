interface TechStackProps {
  project: string;
  technologies: string[];
  color: string;
}

export default function TechStack({
  project,
  technologies,
  color,
}: TechStackProps) {
  return (
    <div className="rounded-none border-4 border-white bg-transparent text-white pb-6">
      <div className="h-2 mb-6" style={{ backgroundColor: color }}></div>
      <div className="px-6">
        <h3 className="text-xl font-bold font-mono mb-4">{project}</h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="border-2 border-white px-3 py-1 text-sm font-medium"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
