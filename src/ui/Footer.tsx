import { ExternalLink, GitFork } from "lucide-react";

function Footer() {
  return (
    <footer className="px-4 py-12 bg-[#F0F0F0] dark:bg-zinc-900 border-t-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold font-mono">FoxwareDen</h3>
            <p className="mt-2">
              Building the future of open source, together.
            </p>
          </div>
          <div className="flex space-x-4">
            <a target="_blank" href="https://github.com/orgs/FoxwareDen/">
              <button className="h-12 w-12 rounded-none border-2 border-black dark:border-white flex items-center justify-center">
                <GitFork className="h-6 w-6" />
              </button>
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/christopher-vos-6469b7284/"
            >
              <button className="h-12 w-12 rounded-none border-2 border-black dark:border-white flex items-center justify-center">
                <ExternalLink className="h-6 w-6" />
              </button>
            </a>
          </div>
        </div>
        <div className="h-0.5 w-full bg-black dark:bg-white mb-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Open Source Collective. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            {/* 
            TODO: add later in development
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Code of Conduct
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
