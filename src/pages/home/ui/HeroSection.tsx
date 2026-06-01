import { useOrg } from "../../../store/orgHook";

function HeroSection() {
  const { orgData, loading } = useOrg();

  const email = "foxwareden@gmail.com";

  return (
    <>

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
                  href={`mailto:${email}`}
                  className="font-mono px-6 py-3 border-4 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Contact Organization
                </a>
                <a
                  href="https://github.com/FoxwareDen"
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