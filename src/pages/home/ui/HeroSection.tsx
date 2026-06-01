import { useOrg } from "../../../store/orgHook";

function HeroSection() {
  const { orgData, loading } = useOrg();

  const email = "foxwareden@gmail.com";
  const github = "https://github.com/foxwareden"; // update to real URL

  return (
    <>
      {/* Header Bar */}
      <header className="w-full border-b-4 border-black dark:border-white bg-white dark:bg-black px-4 py-3 flex items-center justify-between font-mono">
        <a
          href={`mailto:${email}`}
          className="text-sm md:text-base underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          {email}
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-sm font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 pt-20 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black dark:bg-white -skew-x-12 transform origin-top-right -z-10 translate-x-20"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="relative z-10 flex justify-center flex-col">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono tracking-tight">
                {orgData && !loading ? orgData.name : "Foxware-Den"}
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-md flex gap-2">
                Building next-generation web applications and software solutions
                with cutting-edge technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${email}?subject=Learn%20more`}
                  className="font-mono px-6 py-3 border-4 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Contact Organization
                </a>
                <a
                  href=""
                  className="font-mono px-6 py-3 border-4 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Github Repos
                </a>
              </div>
              <h2 className="text-xl mt-4">Email: foxwareden@gmail.com</h2>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FF5252] rotate-12"></div>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#FFD60A] -rotate-12"></div>
              <div className="relative z-10 border-4 border-black dark:border-white p-4 bg-white dark:bg-black transform rotate-2">
                <div className="border-2 border-black dark:border-white p-2">
                  <img
                    fetchPriority="high"
                    src="/hero.webp"
                    alt="Code Illustration"
                    width={500}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;