import { GitBranch, Globe, Mail, MapPin } from "lucide-react";
import { Link } from "react-router";



export default function CardPage() {

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 opacity-20 rotate-12" />
      <div className="absolute bottom-32 right-32 w-40 h-40 bg-blue-500 opacity-20 -rotate-6" />
      <div className="absolute top-1/2 left-10 w-24 h-24 border-4 border-red-500 opacity-30 rotate-45" />
      <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-black dark:bg-white opacity-10 rotate-12" />

      <div className="relative z-10">
        {/* Back link */}
        <Link
          to="/"
          className="inline-block mb-8 px-4 py-2 border-2 border-black dark:border-white font-mono text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          BACK TO HOME
        </Link>

        {/* Business Card */}
        <div className="relative">
          {/* Card shadow/offset effect */}
          <div className="absolute top-2 left-2 w-full h-full bg-black dark:bg-white" />

          {/* Main card */}
          <div className="relative bg-white dark:bg-black border-4 border-black dark:border-white p-8 md:p-12 max-w-xl">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-black dark:bg-white" />

            {/* Corner accents */}
            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-black dark:border-white rotate-45" />
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-yellow-400" />

            {/* Content */}
            <div className="space-y-6">
              {/* Name and title */}
              <div className="border-b-4 border-black dark:border-white pb-6">
                <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter text-black dark:text-white">
                  FOXWAREDEN
                </h1>
                <p className="font-mono text-lg mt-2 text-black dark:text-white opacity-70">
                  WEB DEVELOPMENT STUDIO
                </p>
              </div>

              {/* Tagline */}
              <div className="py-4">
                <p className="font-mono text-sm leading-relaxed text-black dark:text-white">
                  Building next-gen web applications, software solutions, and content management systems with modern technologies.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-3 border-t-2 border-black dark:border-white pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-black dark:border-white flex items-center justify-center">
                    <Mail className="w-4 h-4 text-black dark:text-white" />
                  </div>
                  <span className="font-mono text-sm text-black dark:text-white">foxwareden@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-black dark:border-white flex items-center justify-center">
                    <Globe className="w-4 h-4 text-black dark:text-white" />
                  </div>
                  <span className="font-mono text-sm text-black dark:text-white">www.foxwareden.co.za</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-black dark:border-white flex items-center justify-center">
                    <GitBranch className="w-4 h-4 text-black dark:text-white" />
                  </div>
                  <span className="font-mono text-sm text-black dark:text-white">github.com/foxwareden</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-2 border-black dark:border-white flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-black dark:text-white" />
                  </div>
                  <span className="font-mono text-sm text-black dark:text-white">Remote / Worldwide</span>
                </div>
              </div>

              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-2 pt-4">
                {["REACT", "TAURI", "RUST", "GO"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 border-2 border-black dark:border-white font-mono text-xs font-bold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Bottom section with founders */}
              {/* <div className="flex justify-between items-end pt-6 border-t-2 border-black dark:border-white"> */}
              {/*   <div className="text-right"> */}
              {/*     <div className="w-12 h-12 border-4 border-black dark:border-white flex items-center justify-center"> */}
              {/*       <span className="font-mono text-lg font-bold text-black dark:text-white">FW</span> */}
              {/*     </div> */}
              {/*   </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
