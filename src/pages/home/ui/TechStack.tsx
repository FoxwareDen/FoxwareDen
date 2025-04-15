interface TechStackProps {
  technology: string;
  color: string;
}

export default function TechStack({ technology, color }: TechStackProps) {
  return (
    <div className="rounded-none border-4 border-white bg-transparent text-white pb-6">
      <div className="h-2 mb-6" style={{ backgroundColor: color }}></div>
      <div className="px-6">
        <h3 className="text-xl font-bold font-mono mb-4">{technology}</h3>
        <div className="flex flex-wrap gap-2">{/* TODO: dec */}</div>
      </div>
    </div>
  );
}
