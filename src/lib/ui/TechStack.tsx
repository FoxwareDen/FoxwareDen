interface TechStackProps {
  technology: string;
  color?: string;
  delay?: number;
}

export default function TechStack({
  technology,
  color = "#000000",
  delay = 0,
}: TechStackProps) {
  return (
    <div 
      className="group relative rounded-xl border border-foreground/10 bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-lg animate-fade-in-up opacity-0"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Gradient accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${color} 0%, ${color}88 100%)`,
        }}
      />

      {/* Color dot indicator */}
      <div
        className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-40 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"
        style={{ backgroundColor: color }}
      />

      {/* Content */}
      <div className="p-4 pt-5">
        <h3 className="text-base font-bold font-mono tracking-tight text-foreground">
          {technology}
        </h3>
      </div>

      {/* Bottom highlight on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-1 transition-all duration-300 opacity-60"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
