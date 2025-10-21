import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Project {
  id: number;
  name: string;
  status: "active" | "inactive" | "pending";
  contributors: number;
  lastUpdated: string;
}

function Table() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "DataSync",
      status: "active",
      contributors: 12,
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      name: "StaticGen",
      status: "active",
      contributors: 8,
      lastUpdated: "2024-01-14",
    },
    {
      id: 3,
      name: "AuthKit",
      status: "pending",
      contributors: 15,
      lastUpdated: "2024-01-13",
    },
    {
      id: 4,
      name: "QueryBuilder",
      status: "active",
      contributors: 6,
      lastUpdated: "2024-01-12",
    },
    {
      id: 5,
      name: "UIFramework",
      status: "inactive",
      contributors: 20,
      lastUpdated: "2024-01-10",
    },
  ]);

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#4CAF50]";
      case "inactive":
        return "bg-[#FF5252]";
      case "pending":
        return "bg-[#FFD60A]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-mono">ALL PROJECTS</h2>
        <button className="px-4 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors font-mono font-bold dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          ADD PROJECT
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-2 border-black dark:border-white">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white dark:bg-white dark:text-black">
              <th className="px-4 py-3 text-left font-mono font-bold border-r-2 border-white dark:border-black">
                PROJECT
              </th>
              <th className="px-4 py-3 text-left font-mono font-bold border-r-2 border-white dark:border-black">
                STATUS
              </th>
              <th className="px-4 py-3 text-left font-mono font-bold border-r-2 border-white dark:border-black">
                CONTRIBUTORS
              </th>
              <th className="px-4 py-3 text-left font-mono font-bold border-r-2 border-white dark:border-black">
                LAST UPDATED
              </th>
              <th className="px-4 py-3 text-left font-mono font-bold">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={project.id}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-black"
                    : "bg-gray-100 dark:bg-zinc-800"
                } border-t-2 border-black dark:border-white`}
              >
                <td className="px-4 py-3 font-mono font-bold border-r-2 border-black dark:border-white">
                  {project.name}
                </td>
                <td className="px-4 py-3 border-r-2 border-black dark:border-white">
                  <span
                    className={`inline-block px-3 py-1 ${getStatusColor(
                      project.status
                    )} text-black font-mono font-bold text-sm border-2 border-black`}
                  >
                    {project.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono border-r-2 border-black dark:border-white">
                  {project.contributors}
                </td>
                <td className="px-4 py-3 font-mono border-r-2 border-black dark:border-white">
                  {project.lastUpdated}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="p-2 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 border-2 border-black dark:border-white hover:bg-[#FF5252] hover:text-black hover:border-black transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="border-4 border-black dark:border-white p-4 bg-white dark:bg-black">
          <p className="font-mono text-sm mb-1">TOTAL PROJECTS</p>
          <p className="text-3xl font-bold font-mono">{projects.length}</p>
        </div>
        <div className="border-4 border-black dark:border-white p-4 bg-white dark:bg-black">
          <p className="font-mono text-sm mb-1">ACTIVE</p>
          <p className="text-3xl font-bold font-mono">
            {projects.filter((p) => p.status === "active").length}
          </p>
        </div>
        <div className="border-4 border-black dark:border-white p-4 bg-white dark:bg-black">
          <p className="font-mono text-sm mb-1">TOTAL CONTRIBUTORS</p>
          <p className="text-3xl font-bold font-mono">
            {projects.reduce((sum, p) => sum + p.contributors, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Table;
