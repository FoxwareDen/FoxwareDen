import ClientSection from "./ui/ClientSection";
import Tabs from "./ui/Tabs";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-24 right-10 w-48 h-48 bg-vibrant-purple/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-vibrant-teal/10 rounded-full blur-3xl animate-float [animation-delay:1s]" />
      <div className="max-w-7xl mx-auto p-4 md:p-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-2">
            DASHBOARD
          </h1>
          <p className="text-muted-foreground">
            Manage your webpage data
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs />

        <div className="my-8">
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-2">
            CLIENT MANAGEMENT
          </h1>
          <p className="text-muted-foreground">
            Manage your client data and projects
          </p>
        </div>
        <ClientSection />
      </div>
    </div>
  );
}
