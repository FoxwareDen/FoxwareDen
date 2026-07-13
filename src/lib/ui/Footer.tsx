import { ExternalLink, GitFork, Mail, Heart } from "lucide-react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="px-4 py-12 bg-card border-t border-foreground/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold font-mono bg-gradient-to-r from-vibrant-purple to-vibrant-teal bg-clip-text text-transparent">
              FoxwareDen
            </h3>
            <p className="mt-2 text-muted-foreground flex items-center gap-1">
              Building the future with <Heart className="w-4 h-4 text-vibrant-pink animate-pulse-glow" />
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a target="_blank" href="https://github.com/orgs/FoxwareDen/">
              <button
                aria-label="link to github page"
                className="h-12 w-12 rounded-xl border border-foreground/10 bg-background hover:bg-vibrant-purple/10 hover:border-vibrant-purple/30 flex items-center justify-center transition-all duration-300 group"
              >
                <GitFork className="h-5 w-5 text-foreground group-hover:text-vibrant-purple transition-colors" />
              </button>
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/christopher-vos-6469b7284/"
            >
              <button
                aria-label="link to linkedin page"
                className="h-12 w-12 rounded-xl border border-foreground/10 bg-background hover:bg-vibrant-teal/10 hover:border-vibrant-teal/30 flex items-center justify-center transition-all duration-300 group"
              >
                <ExternalLink className="h-5 w-5 text-foreground group-hover:text-vibrant-teal transition-colors" />
              </button>
            </a>
            <a href="mailto:foxwareden@gmail.com">
              <button
                aria-label="send email"
                className="h-12 w-12 rounded-xl border border-foreground/10 bg-background hover:bg-vibrant-amber/10 hover:border-vibrant-amber/30 flex items-center justify-center transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 text-foreground group-hover:text-vibrant-amber transition-colors" />
              </button>
            </a>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FoxwareDen. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-vibrant-purple transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-vibrant-teal transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/about"
              className="text-sm text-muted-foreground hover:text-vibrant-amber transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
