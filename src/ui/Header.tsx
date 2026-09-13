import { useState } from "react";
import {
  GitFork,
  Menu,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import Alert from "./Alert";
import { useOrg } from "../store/orgHook";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const { orgData, loading } = useOrg();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10 sticky top-0">
      <Alert />
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl font-mono group">
          <span className="bg-gradient-to-r from-vibrant-purple to-vibrant-teal bg-clip-text text-transparent group-hover:from-vibrant-teal group-hover:to-vibrant-amber transition-all duration-500">
            {orgData && !loading ? orgData.name : "Foxware-Den"}
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/products"
            className="font-medium text-foreground hover:text-vibrant-purple transition-colors"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="font-medium text-foreground hover:text-vibrant-purple transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-vibrant-purple hover:after:w-full after:transition-all after:duration-300"
          >
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <a
            href={orgData ? orgData.html_url : "https://github.com/FoxwareDen"}
            target="_blank"
            aria-label="org repo link"
            className="h-10 w-10 rounded-lg border border-foreground/10 bg-background hover:bg-vibrant-purple/10 hover:border-vibrant-purple/30 flex items-center justify-center transition-all duration-300 group"
          >
            <GitFork className="h-5 w-5 text-foreground group-hover:text-vibrant-purple transition-colors" />
          </a>
          {/* Dashboard link disabled while the dashboard route is disabled. */}
        </div>

        {/* Mobile Navigation */}
        <button
          aria-label="toggle navbar menu"
          className="md:hidden h-10 w-10 rounded-lg border border-foreground/10 flex items-center justify-center"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg animate-fade-in-up">
            <div className="h-full flex flex-col">
              <div className="h-20 border-b border-foreground/10 flex items-center px-6 justify-between">
                <span className="font-bold text-2xl font-mono bg-gradient-to-r from-vibrant-purple to-vibrant-teal bg-clip-text text-transparent">
                  {orgData && !loading ? orgData.name : "Foxware-Den"}
                </span>
                <button
                  aria-label="close navbar menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="h-10 w-10 rounded-lg border border-foreground/10 flex items-center justify-center hover:bg-foreground/5 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col py-8 px-6 space-y-6 overflow-y-auto">
                <Link
                  to="/"
                  className="text-2xl font-medium text-foreground hover:text-vibrant-purple transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-2xl font-medium text-foreground hover:text-vibrant-purple transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className="text-2xl font-medium text-foreground hover:text-vibrant-teal transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </nav>
              <div className="mt-auto border-t border-foreground/10 p-6 flex flex-col space-y-4">
                <a
                  href={
                    orgData ? orgData.html_url : "https://github.com/FoxwareDen"
                  }
                  target="_blank"
                >
                  <button
                    aria-label="link to orgs repo"
                    className="w-full border border-foreground/10 rounded-lg h-14 flex items-center justify-center gap-2 hover:bg-vibrant-purple/10 hover:border-vibrant-purple/30 transition-all group"
                  >
                    <GitFork className="h-5 w-5 group-hover:text-vibrant-purple transition-colors" />
                    <span className="group-hover:text-vibrant-purple transition-colors">
                      GitHub Repo
                    </span>
                  </button>
                </a>
                <div className="w-full border border-foreground/10 rounded-lg h-14 flex items-center justify-center gap-2">
                  <ThemeToggle className="border-0 h-full w-full" />
                  <span>Toggle Theme</span>
                </div>

                {/* Dashboard link disabled while the dashboard route is disabled. */}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
