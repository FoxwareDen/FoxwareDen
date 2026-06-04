import { useOrg } from "../../../store/orgHook";
import { ArrowRight, Code, Globe, Sparkles } from "lucide-react";

function HeroSection() {
  const { orgData, loading } = useOrg();

  const email = "foxwareden@gmail.com";

  return (
    <section className="relative px-4 pt-20 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-vibrant-purple/20 via-vibrant-teal/10 to-transparent -skew-x-12 transform origin-top-right translate-x-20" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-vibrant-amber/15 to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-vibrant-purple/30 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-vibrant-teal/25 rounded-full blur-xl animate-float [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-vibrant-amber/30 rounded-full blur-xl animate-float [animation-delay:2s]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="relative z-10 flex justify-center flex-col">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-down">
              <span className="px-4 py-1.5 bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white font-mono text-sm rounded-full flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Software Development Studio
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono tracking-tight animate-fade-in-up text-foreground">
              {orgData && !loading ? orgData.name : "Foxware-Den"}
            </h1>
            
            <p className="text-lg md:text-xl mb-8 max-w-md text-muted-foreground leading-relaxed animate-fade-in-up [animation-delay:0.2s] opacity-0">
              Building next-generation{" "}
              <span className="text-vibrant-purple font-semibold">web applications</span>,{" "}
              <span className="text-vibrant-teal font-semibold">desktop software</span>, and{" "}
              <span className="text-vibrant-amber font-semibold">custom solutions</span>{" "}
              with cutting-edge technology.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up [animation-delay:0.3s] opacity-0">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-vibrant-purple/10 text-vibrant-purple font-mono text-sm border border-vibrant-purple/20 rounded-lg">
                <Globe className="w-4 h-4" />
                Web Apps
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-vibrant-teal/10 text-vibrant-teal font-mono text-sm border border-vibrant-teal/20 rounded-lg">
                <Code className="w-4 h-4" />
                Desktop Apps
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-vibrant-amber/10 text-vibrant-amber font-mono text-sm border border-vibrant-amber/20 rounded-lg">
                <Sparkles className="w-4 h-4" />
                Any Software
              </span>
            </div>

            <div className="flex flex-wrap gap-4 animate-fade-in-up [animation-delay:0.4s] opacity-0">
              <a
                href={`mailto:${email}`}
                className="group font-mono px-6 py-3 bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white rounded-lg hover:shadow-lg hover:shadow-vibrant-purple/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://github.com/FoxwareDen"
                className="font-mono px-6 py-3 border-2 border-foreground/20 text-foreground hover:border-vibrant-purple hover:text-vibrant-purple rounded-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                View Our Work
              </a>
            </div>

            <p className="mt-6 text-sm text-muted-foreground font-mono animate-fade-in-up [animation-delay:0.5s] opacity-0">
              foxwareden@gmail.com
            </p>
          </div>

          <div className="relative animate-scale-in [animation-delay:0.3s] opacity-0">
            {/* Decorative shapes */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-vibrant-pink rotate-12 rounded-2xl animate-float" />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-vibrant-amber -rotate-12 rounded-2xl animate-float [animation-delay:1s]" />
            <div className="absolute top-1/2 -right-5 w-16 h-16 bg-vibrant-teal rotate-45 rounded-xl animate-bounce-subtle" />

            {/* Main image container */}
            <div className="relative z-10 border-4 border-foreground/10 p-4 bg-card transform rotate-2 hover:rotate-0 transition-transform duration-500 rounded-2xl shadow-xl">
              <div className="border-2 border-foreground/5 p-2 rounded-xl overflow-hidden">
                <img
                  fetchPriority="high"
                  src="/hero.webp"
                  alt="Code Illustration"
                  width={500}
                  height={400}
                  className="w-full object-cover rounded-lg"
                />
              </div>
              
              {/* Floating badge on image */}
              <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-vibrant-teal to-vibrant-blue text-white font-mono text-sm rounded-lg shadow-lg animate-bounce-subtle">
                Full-Stack Development
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
