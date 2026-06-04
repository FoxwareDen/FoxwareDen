import { Link } from "react-router";
import { ArrowLeft, Home } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-vibrant-pink/20 rounded-2xl rotate-12 blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-vibrant-purple/20 rounded-2xl -rotate-12 blur-xl animate-float [animation-delay:1s]" />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-vibrant-teal/20 rounded-2xl rotate-45 blur-xl animate-float [animation-delay:2s]" />

      <div className="relative z-10 text-center animate-scale-in">
        <h1 className="text-8xl md:text-9xl font-bold mb-4 font-mono bg-gradient-to-r from-vibrant-purple via-vibrant-teal to-vibrant-amber bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl mb-4 font-mono text-foreground">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-vibrant-purple/25 transition-all duration-300 hover:-translate-y-0.5 font-mono"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-6 py-3 rounded-lg hover:border-vibrant-purple hover:text-vibrant-purple transition-all duration-300 font-mono"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
