import ClientSection from "./ui/ClientSection";
import Tabs from "./ui/Tabs";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-2">
            DASHBOARD
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your webpage data
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs />

        <div className="my-8">
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-2">
            CLIENT MANAGEMENT
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your clients data and stuff
          </p>
        </div>
        <ClientSection />
      </div>
    </div>
  );
}
