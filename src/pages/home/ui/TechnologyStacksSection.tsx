import TechStack from "./TechStack";

type TechStack = {
  technology: string;
  color: string;
};

function TechnologyStacksSection() {
  return (
    <section className="px-4 py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black dark:from-zinc-950 dark:via-black dark:to-zinc-950" />

      <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white/10 rotate-12" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-white/10 -rotate-12" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-white">
            TECH STACKS
          </h2>
          <p className="text-lg text-white/80 max-w-2xl">
            Powered by cutting-edge technologies and frameworks
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          <TechStack technology="TypeScript" color="#3178C6" />
          <TechStack technology="JavaScript" color="#F7DF1E" />
          <TechStack technology="React" color="#61DAFB" />
          <TechStack technology="Node.js" color="#8BC34A" />
          <TechStack technology="PostgreSQL" color="#FF5722" />
          <TechStack technology="Docker" color="#0D47A1" />
          <TechStack technology="Vercel" color="#FF4081" />
          <TechStack technology="Next.js" color="#9C27B0" />
          <TechStack technology="Tailwind" color="#00BCD4" />
          <TechStack technology="Rust" color="#FF6D00" />
          <TechStack technology="Python" color="#4CAF50" />
        </div>
      </div>
    </section>
  );
  // <TechStack technology="MongoDB" color="#47A248" />
  //         <TechStack technology="Redis" color="#DC382D" />
  //         <TechStack technology="GraphQL" color="#E10098" />
  //         <TechStack technology="Kubernetes" color="#326CE5" />
  //         <TechStack technology="AWS" color="#FF9900" />
  //         <TechStack technology="Go" color="#00ADD8" />
  //         <TechStack technology="WebAssembly" color="#654FF0" />
  //         <TechStack technology="Svelte" color="#FF3E00" />
  //         <TechStack technology="Vue.js" color="#4FC08D" />
}

export default TechnologyStacksSection;
