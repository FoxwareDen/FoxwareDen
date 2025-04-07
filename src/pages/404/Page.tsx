import { Link } from "react-router";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-2">404</h1>
      <h2 className="text-2xl mb-8">Page Not Found</h2>
      <Link
        to="/"
        className="bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors rounded-none px-4 py-2 dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white"
      >
        Return Home
      </Link>
    </div>
  );
}

export default NotFound;
