import { Code, Rocket, Shield } from "lucide-react";

export default function Services() {
  return (
    <section className="container mx-auto px-4 py-20 border-t-4 border-black dark:border-white">
      <h2 className="font-mono text-4xl md:text-5xl font-bold mb-12   ">
        WHAT WE DO
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
        {/* Service 1 */}
        <div className="border-4 border-black dark:border-white p-6 bg-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group">
          <Rocket className="w-12 h-12 mb-4 group-hover:rotate-12 transition-transform" />
          <h3 className="font-mono text-xl font-bold mb-3">WEB APPLICATIONS</h3>
          <p className="font-mono text-sm leading-relaxed">
            Full-stack web applications built with React, Next.js, and modern
            frameworks. From landing pages to complex SaaS platforms.
          </p>
        </div>

        {/* Service 2 */}
        <div className="border-4 border-black dark:border-white p-6 bg-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group">
          <Shield className="w-12 h-12 mb-4 group-hover:rotate-12 transition-transform" />
          <h3 className="font-mono text-xl font-bold mb-3">
            SOFTWARE SOLUTIONS
          </h3>
          <p className="font-mono text-sm leading-relaxed">
            Custom software tailored to your needs. Desktop applications with
            Tauri, CLI tools with Rust and Go, and automation systems.
          </p>
        </div>

        {/* Service 3 */}
        <div className="border-4 border-black dark:border-white p-6 bg-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group">
          <Code className="w-12 h-12 mb-4 group-hover:rotate-12 transition-transform" />
          <h3 className="font-mono text-xl font-bold mb-3">CMS & MANAGEMENT</h3>
          <p className="font-mono text-sm leading-relaxed">
            Content and system management applications. Scalable solutions for
            managing data, users, and workflows with intuitive interfaces.
          </p>
        </div>
      </div>
    </section>
  );
}
