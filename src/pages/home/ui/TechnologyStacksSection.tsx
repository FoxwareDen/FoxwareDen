import React, { useState } from "react";
import TechStack from "./TechStack";

type TechStack = {
  project: string;
  technologies: string[];
  color: string;
};

function TechnologyStacksSection() {
  const [techStacks, settechStacks] = useState<TechStack[]>([
    {
      project: "DataSync",
      technologies: [
        "TypeScript",
        "WebSockets",
        "IndexedDB",
        "React",
        "Node.js",
      ],
      color: "#4A9DFF",
    },
    {
      project: "StaticGen",
      technologies: ["JavaScript", "Markdown", "Webpack", "PostCSS", "Node.js"],
      color: "#FF5252",
    },
    {
      project: "AuthKit",
      technologies: ["TypeScript", "JWT", "OAuth", "Express", "PostgreSQL"],
      color: "#FFD60A",
    },
    {
      project: "QueryBuilder",
      technologies: ["TypeScript", "SQL", "PostgreSQL", "MySQL", "SQLite"],
      color: "#4CAF50",
    },
    {
      project: "UIFramework",
      technologies: ["JavaScript", "CSS", "ARIA", "Storybook", "Jest"],
      color: "#9C27B0",
    },
    {
      project: "DevTools",
      technologies: [
        "Rust",
        "WebAssembly",
        "Chrome Extensions",
        "Firefox Add-ons",
      ],
      color: "#FF9800",
    },
  ]);

  return (
    <section className="px-4 py-16 md:py-24 bg-black text-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold font-mono mb-12">
          TECH STACKS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {techStacks.map((techStack, index) => (
            <TechStack
              key={index}
              project={techStack.project}
              technologies={techStack.technologies}
              color={techStack.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnologyStacksSection;
