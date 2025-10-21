import { Home, LogOut } from "lucide-react";
import { Link } from "react-router";
import Tabs from "./ui/Tabs";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-zinc-900">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-black border-b-4 border-black dark:border-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-bold text-2xl font-mono">
              OSC
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="px-4 py-2 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-mono"
              >
                <Home className="h-5 w-5" />
              </Link>
              <button className="px-4 py-2 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-mono">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-2">
            DASHBOARD
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your projects and settings
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs />
      </div>
    </div>
  );
}
