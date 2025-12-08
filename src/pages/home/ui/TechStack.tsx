interface TechStackProps {
  technology: string;
  color?: string;
}

export default function TechStack({
  technology,
  color = "#000000",
}: TechStackProps) {
  return (
    <div className="group relative rounded-none border-2 border-black dark:border-white bg-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 overflow-hidden">
      {/* Gradient accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-100 group-hover:h-2 transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${color} 0%, ${color}88 100%)`,
        }}
      />

      {/* Color dot indicator */}
      <div
        className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"
        style={{ backgroundColor: color }}
      />

      {/* Content */}
      <div className="p-4 pt-5">
        <h3 className="text-base font-bold font-mono tracking-tight">
          {technology}
        </h3>
      </div>

      {/* Bottom highlight on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-1 transition-all duration-300 opacity-80"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
