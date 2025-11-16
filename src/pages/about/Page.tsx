import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Services from "../../ui/Services";

export default function AboutPage() {
  return (
    <>
      {" "}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl">
          <div className="mb-8">
            <span className="font-mono text-sm border-2 border-black dark:border-white px-3 py-1 inline-block">
              EST. 2024
            </span>
          </div>
          <h1 className="font-mono text-5xl md:text-7xl font-bold mb-6 leading-tight">
            FOXWAREDEN
          </h1>
          <p className="font-mono text-xl md:text-2xl mb-8 leading-relaxed">
            Building next-generation web applications and software solutions
            with cutting-edge technology.
          </p>
          <div className="flex gap-4">
            {/* <Link
              to="/product"
              className="font-mono px-6 py-3 bg-black dark:bg-white text-white dark:text-black border-4 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors inline-flex items-center gap-2"
            >
              VIEW PRODUCTS <ArrowRight className="w-5 h-5" />
            </Link> */}
            <Link
              to="mailto:foxwareden@gmail.com?subject=Learn%20more"
              className="font-mono px-6 py-3 border-4 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-40 right-10 w-32 h-32 bg-yellow-400 -rotate-12 opacity-20" />
        <div className="absolute top-80 right-40 w-24 h-24 border-4 border-blue-500 rotate-45 opacity-30" />
      </section>
      {/* Founders Section */}
      {/* <section className="container mx-auto px-4 py-20 border-t-4 border-black dark:border-white">
        <h2 className="font-mono text-4xl md:text-5xl font-bold mb-12 -rotate-1">
          [FOUNDERS]
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          
          <div className="border-4 border-black dark:border-white p-8 bg-white dark:bg-black -rotate-1 hover:rotate-0 transition-transform">
            <div className="w-20 h-20 bg-blue-500 border-4 border-black dark:border-white mb-6 flex items-center justify-center">
              <Code className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-mono text-2xl font-bold mb-2">CHRISTOPHER</h3>
            <p className="font-mono text-sm mb-4 text-gray-600 dark:text-gray-400">
              SOFTWARE ENGINEER
            </p>
            <p className="font-mono text-base leading-relaxed">
              Focused on performance-driven software solutions using React,
              Node, Rust, Tauri and modern web technologies. Systems architect
              and optimization specialist.
            </p>
          </div>
          
          <div className="border-4 border-black dark:border-white p-8 bg-white dark:bg-black rotate-1 hover:rotate-0 transition-transform">
            <div className="w-20 h-20 bg-red-600 border-4 border-black dark:border-white mb-6 flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-mono text-2xl font-bold mb-2">LUGAN</h3>
            <p className="font-mono text-sm mb-4 text-gray-600 dark:text-gray-400">
              FULL-STACK DEVELOPER
            </p>
            <p className="font-mono text-base leading-relaxed">
              Specializes in building robust web applications with modern
              frameworks. Expert in React, Next.js, and Frontend systems.
            </p>
          </div>
        </div>
      </section> */}
      {/* What We Do Section */}
      <Services />
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t-4 border-black dark:border-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-mono text-4xl md:text-5xl font-bold mb-6">
            READY TO BUILD SOMETHING GREAT?
          </h2>
          <p className="font-mono text-lg mb-8 leading-relaxed">
            Let's discuss your next project and create something extraordinary
            together.
          </p>
          {/* TODO: work on contact page
           */}
          <Link
            to="mailto:foxwareden@gmail.com?subject=Learn%20more"
            className="font-mono text-lg px-8 py-4 bg-black dark:bg-white text-white dark:text-black border-4 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors inline-flex items-center gap-2"
          >
            START A PROJECT <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        {/* Decorative shapes */}
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-red-600 rotate-12 opacity-20" />
        <div className="absolute bottom-40 right-20 w-32 h-32 border-4 border-yellow-400 -rotate-6 opacity-30" />
      </section>
    </>
  );
}
