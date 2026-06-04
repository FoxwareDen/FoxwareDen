import TechStack from "./TechStack";

function TechnologyStacksSection() {
  return (
    <section className="px-4 py-16 md:py-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-vibrant-purple/10 via-background to-vibrant-teal/10" />
      
      {/* Decorative floating elements */}
      <div className="absolute top-10 right-10 w-32 h-32 border-2 border-vibrant-purple/20 rotate-12 rounded-2xl animate-float" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-vibrant-teal/20 -rotate-12 rounded-2xl animate-float [animation-delay:1s]" />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-vibrant-amber/10 rotate-45 rounded-xl animate-float [animation-delay:2s]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 animate-fade-in-up">
          <span className="inline-block px-3 py-1 bg-vibrant-blue/10 text-vibrant-blue font-mono text-sm rounded-full mb-4">
            Technologies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-foreground">
            TECH STACKS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Powered by cutting-edge technologies and frameworks
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          <TechStack technology="TypeScript" color="#3178C6" delay={0} />
          <TechStack technology="JavaScript" color="#F7DF1E" delay={0.05} />
          <TechStack technology="React" color="#61DAFB" delay={0.1} />
          <TechStack technology="Node.js" color="#8BC34A" delay={0.15} />
          <TechStack technology="PostgreSQL" color="#336791" delay={0.2} />
          <TechStack technology="Docker" color="#2496ED" delay={0.25} />
          <TechStack technology="Vercel" color="#000000" delay={0.3} />
          <TechStack technology="Next.js" color="#9C27B0" delay={0.35} />
          <TechStack technology="Tailwind" color="#06B6D4" delay={0.4} />
          <TechStack technology="Rust" color="#FF6D00" delay={0.45} />
          <TechStack technology="Python" color="#3776AB" delay={0.5} />
        </div>
      </div>
    </section>
  );
}

export default TechnologyStacksSection;
