import { ArrowRight, Code, Users, Lightbulb, Target, Rocket, Heart } from "lucide-react";
import { Link } from "react-router";
import Services from "../../ui/Services";

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 md:py-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-vibrant-amber/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-vibrant-purple/20 rounded-full blur-3xl animate-float [animation-delay:1s]" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-vibrant-teal/20 rounded-full blur-3xl animate-float [animation-delay:2s]" />

        <div className="max-w-4xl relative z-10">
          <div className="mb-8 animate-fade-in-down">
            <span className="font-mono text-sm bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              EST. 2024
            </span>
          </div>

          <h1 className="font-mono text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up text-foreground">
            <span className="bg-gradient-to-r from-vibrant-purple via-vibrant-teal to-vibrant-amber bg-clip-text text-transparent">
              FOXWAREDEN
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-muted-foreground animate-fade-in-up [animation-delay:0.2s] opacity-0">
            A passionate software development studio building{" "}
            <span className="text-vibrant-purple font-semibold">web applications</span>,{" "}
            <span className="text-vibrant-teal font-semibold">desktop software</span>, and{" "}
            <span className="text-vibrant-amber font-semibold">custom solutions</span>{" "}
            that push the boundaries of what&apos;s possible.
          </p>

          <div className="flex gap-4 animate-fade-in-up [animation-delay:0.3s] opacity-0">
            <Link
              to="mailto:foxwareden@gmail.com?subject=Learn%20more"
              className="group font-mono px-6 py-3 bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white rounded-lg hover:shadow-lg hover:shadow-vibrant-purple/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              GET IN TOUCH
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="container mx-auto px-4 py-20 border-t border-foreground/10">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
          <div className="animate-fade-in-left opacity-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vibrant-purple to-vibrant-blue p-0.5 mb-6">
              <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-vibrant-purple" />
              </div>
            </div>
            <h2 className="font-mono text-3xl font-bold mb-4 text-foreground">OUR MISSION</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To empower businesses and individuals with innovative software solutions that are not only functional but exceptional. We believe great software should be accessible, performant, and a joy to use.
            </p>
          </div>

          <div className="animate-fade-in-right opacity-0 [animation-delay:0.2s]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-vibrant-teal to-vibrant-blue p-0.5 mb-6">
              <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-vibrant-teal" />
              </div>
            </div>
            <h2 className="font-mono text-3xl font-bold mb-4 text-foreground">OUR VISION</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To be the go-to development partner for ambitious projects, known for our technical excellence, creative problem-solving, and unwavering commitment to quality.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-20 border-t border-foreground/10">
        <div className="mb-12 animate-fade-in-up">
          <span className="inline-block px-3 py-1 bg-vibrant-amber/10 text-vibrant-amber font-mono text-sm rounded-full mb-4">
            What Drives Us
          </span>
          <h2 className="font-mono text-4xl md:text-5xl font-bold mb-4 text-foreground">
            OUR VALUES
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
          <div className="group p-6 border border-foreground/10 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up opacity-0 [animation-delay:0.1s]">
            <div className="w-12 h-12 rounded-xl bg-vibrant-purple/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Code className="w-6 h-6 text-vibrant-purple" />
            </div>
            <h3 className="font-mono text-xl font-bold mb-2 text-foreground">QUALITY CODE</h3>
            <p className="text-muted-foreground">
              We write clean, maintainable, and well-documented code that stands the test of time.
            </p>
          </div>

          <div className="group p-6 border border-foreground/10 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up opacity-0 [animation-delay:0.2s]">
            <div className="w-12 h-12 rounded-xl bg-vibrant-teal/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-vibrant-teal" />
            </div>
            <h3 className="font-mono text-xl font-bold mb-2 text-foreground">COLLABORATION</h3>
            <p className="text-muted-foreground">
              Your success is our success. We work closely with clients to understand their needs.
            </p>
          </div>

          <div className="group p-6 border border-foreground/10 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up opacity-0 [animation-delay:0.3s]">
            <div className="w-12 h-12 rounded-xl bg-vibrant-amber/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-vibrant-amber" />
            </div>
            <h3 className="font-mono text-xl font-bold mb-2 text-foreground">PASSION</h3>
            <p className="text-muted-foreground">
              We love what we do. Every project is an opportunity to create something amazing.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Expertise Section */}
      <section className="container mx-auto px-4 py-20 border-t border-foreground/10">
        <div className="mb-12 animate-fade-in-up">
          <span className="inline-block px-3 py-1 bg-vibrant-teal/10 text-vibrant-teal font-mono text-sm rounded-full mb-4">
            Technical Excellence
          </span>
          <h2 className="font-mono text-4xl md:text-5xl font-bold mb-4 text-foreground">
            OUR EXPERTISE
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            We specialize in modern technologies that power today&apos;s best software.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <div className="p-6 border border-foreground/10 rounded-xl bg-card animate-fade-in-left opacity-0">
            <h3 className="font-mono text-xl font-bold mb-4 text-vibrant-purple">FRONTEND</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Svelte"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-vibrant-purple/10 text-vibrant-purple text-sm rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 border border-foreground/10 rounded-xl bg-card animate-fade-in-right opacity-0 [animation-delay:0.1s]">
            <h3 className="font-mono text-xl font-bold mb-4 text-vibrant-teal">BACKEND</h3>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "Rust", "Python", "Go", "PostgreSQL", "Redis"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-vibrant-teal/10 text-vibrant-teal text-sm rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 border border-foreground/10 rounded-xl bg-card animate-fade-in-left opacity-0 [animation-delay:0.2s]">
            <h3 className="font-mono text-xl font-bold mb-4 text-vibrant-amber">DESKTOP</h3>
            <div className="flex flex-wrap gap-2">
              {["Tauri", "Electron", "Rust", "WebView", "Cross-Platform"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-vibrant-amber/10 text-vibrant-amber text-sm rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 border border-foreground/10 rounded-xl bg-card animate-fade-in-right opacity-0 [animation-delay:0.3s]">
            <h3 className="font-mono text-xl font-bold mb-4 text-vibrant-pink">DEVOPS</h3>
            <div className="flex flex-wrap gap-2">
              {["Docker", "Vercel", "AWS", "GitHub Actions", "Linux"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-vibrant-pink/10 text-vibrant-pink text-sm rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <Services />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-foreground/10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block px-3 py-1 bg-vibrant-purple/10 text-vibrant-purple font-mono text-sm rounded-full mb-4">
              Let&apos;s Work Together
            </span>
          </div>
          
          <h2 className="font-mono text-4xl md:text-5xl font-bold mb-6 text-foreground animate-fade-in-up [animation-delay:0.1s] opacity-0">
            READY TO BUILD SOMETHING{" "}
            <span className="bg-gradient-to-r from-vibrant-purple via-vibrant-teal to-vibrant-amber bg-clip-text text-transparent">
              GREAT?
            </span>
          </h2>
          
          <p className="text-lg mb-8 leading-relaxed text-muted-foreground animate-fade-in-up [animation-delay:0.2s] opacity-0">
            Whether you need a web app, desktop software, or any custom solution,
            we&apos;re here to bring your vision to life.
          </p>

          <Link
            to="mailto:foxwareden@gmail.com?subject=Project%20Inquiry"
            className="group inline-flex items-center gap-2 font-mono text-lg px-8 py-4 bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white rounded-lg hover:shadow-lg hover:shadow-vibrant-purple/25 transition-all duration-300 hover:-translate-y-0.5 animate-fade-in-up [animation-delay:0.3s] opacity-0"
          >
            START A PROJECT
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
