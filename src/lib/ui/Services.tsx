import { Code, Rocket, Shield, Monitor, Zap, Database } from "lucide-react";

const services = [
  {
    icon: Rocket,
    title: "WEB APPLICATIONS",
    description: "Full-stack web applications built with React, Next.js, and modern frameworks. From landing pages to complex SaaS platforms.",
    color: "vibrant-purple",
    gradient: "from-vibrant-purple to-vibrant-blue",
  },
  {
    icon: Monitor,
    title: "DESKTOP SOFTWARE",
    description: "Cross-platform desktop applications with Tauri and Electron. Native performance with modern web technologies.",
    color: "vibrant-teal",
    gradient: "from-vibrant-teal to-vibrant-blue",
  },
  {
    icon: Shield,
    title: "SOFTWARE SOLUTIONS",
    description: "Custom software tailored to your needs. CLI tools with Rust and Go, automation systems, and more.",
    color: "vibrant-amber",
    gradient: "from-vibrant-amber to-vibrant-pink",
  },
  {
    icon: Code,
    title: "API DEVELOPMENT",
    description: "RESTful and GraphQL APIs built for scale. Robust backend systems with Node.js, Rust, and Python.",
    color: "vibrant-pink",
    gradient: "from-vibrant-pink to-vibrant-purple",
  },
  {
    icon: Database,
    title: "CMS & DATABASES",
    description: "Content and data management solutions. Scalable databases, admin panels, and intuitive dashboards.",
    color: "vibrant-blue",
    gradient: "from-vibrant-blue to-vibrant-teal",
  },
  {
    icon: Zap,
    title: "AUTOMATION",
    description: "Workflow automation and system integration. Streamline processes and boost productivity with custom tools.",
    color: "vibrant-purple",
    gradient: "from-vibrant-purple to-vibrant-teal",
  },
];

export default function Services() {
  return (
    <section className="container mx-auto px-4 py-20 border-t border-foreground/10">
      <div className="mb-12 animate-fade-in-up">
        <span className="inline-block px-3 py-1 bg-vibrant-purple/10 text-vibrant-purple font-mono text-sm rounded-full mb-4">
          Our Services
        </span>
        <h2 className="font-mono text-4xl md:text-5xl font-bold mb-4 text-foreground">
          WHAT WE DO
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          From concept to deployment, we build software that powers your business forward.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {services.map((service, index) => (
          <div
            key={service.title}
            className={`group relative overflow-hidden border border-foreground/10 p-6 bg-card hover:bg-card/80 transition-all duration-500 rounded-xl hover:-translate-y-1 hover:shadow-xl animate-fade-in-up opacity-0`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            {/* Background glow on hover */}
            <div className={`absolute inset-0 bg-${service.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                  <service.icon className={`w-7 h-7 text-${service.color}`} />
                </div>
              </div>
              
              <h3 className="font-mono text-xl font-bold mb-3 text-foreground group-hover:text-vibrant-purple transition-colors">
                {service.title}
              </h3>
              
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
