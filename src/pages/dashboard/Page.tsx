import type React from "react";

import { useState } from "react";
import { Link } from "react-router";
import { Home, LogOut, Plus, Trash2, Edit } from "lucide-react";
import BrutalistSwitch from "../../ui/Switch";

type TabType = "table" | "form";

interface Project {
  id: number;
  name: string;
  status: "active" | "inactive" | "pending";
  contributors: number;
  lastUpdated: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("table");
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

  // Form state
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    repository: "",
    language: "",
    license: "MIT",
    isPublic: true,
    hasDocumentation: false,
  });

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      projectName: "",
      description: "",
      repository: "",
      language: "",
      license: "MIT",
      isPublic: true,
      hasDocumentation: false,
    });
    alert("Project created successfully!");
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
        <div className="border-4 border-black dark:border-white mb-0 bg-white dark:bg-black">
          <div className="flex border-b-4 border-black dark:border-white">
            <button
              onClick={() => setActiveTab("table")}
              className={`flex-1 px-6 py-4 font-mono font-bold transition-colors border-r-4 border-black dark:border-white ${
                activeTab === "table"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-black dark:bg-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
            >
              PROJECTS TABLE
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`flex-1 px-6 py-4 font-mono font-bold transition-colors ${
                activeTab === "form"
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-black dark:bg-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
            >
              NEW PROJECT
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "table" && (
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
                    <p className="text-3xl font-bold font-mono">
                      {projects.length}
                    </p>
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
            )}

            {activeTab === "form" && (
              <div>
                <h2 className="text-2xl font-bold font-mono mb-6">
                  CREATE NEW PROJECT
                </h2>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Project Name */}
                  <div>
                    <label
                      htmlFor="projectName"
                      className="block font-mono font-bold mb-2"
                    >
                      PROJECT NAME *
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      value={formData.projectName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                      placeholder="Enter project name"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block font-mono font-bold mb-2"
                    >
                      DESCRIPTION *
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white min-h-[120px]"
                      placeholder="Describe your project"
                      required
                    />
                  </div>

                  {/* Repository URL */}
                  <div>
                    <label
                      htmlFor="repository"
                      className="block font-mono font-bold mb-2"
                    >
                      REPOSITORY URL *
                    </label>
                    <input
                      type="url"
                      id="repository"
                      value={formData.repository}
                      onChange={(e) =>
                        setFormData({ ...formData, repository: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                      placeholder="https://github.com/username/repo"
                      required
                    />
                  </div>

                  {/* Language & License */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="language"
                        className="block font-mono font-bold mb-2"
                      >
                        LANGUAGE *
                      </label>
                      <select
                        id="language"
                        value={formData.language}
                        onChange={(e) =>
                          setFormData({ ...formData, language: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-black dark:border-white bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        required
                      >
                        <option value="">Select language</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="Rust">Rust</option>
                        <option value="Go">Go</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="license"
                        className="block font-mono font-bold mb-2"
                      >
                        LICENSE *
                      </label>
                      <select
                        id="license"
                        value={formData.license}
                        onChange={(e) =>
                          setFormData({ ...formData, license: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-black dark:border-white bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        required
                      >
                        <option value="MIT">MIT</option>
                        <option value="Apache-2.0">Apache 2.0</option>
                        <option value="GPL-3.0">GPL 3.0</option>
                        <option value="BSD-3-Clause">BSD 3-Clause</option>
                      </select>
                    </div>
                  </div>

                  {/* Switches */}
                  <div className="space-y-4 border-2 border-black dark:border-white p-4">
                    <BrutalistSwitch
                      checked={formData.isPublic}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isPublic: checked })
                      }
                      label="PUBLIC REPOSITORY"
                    />
                    <BrutalistSwitch
                      checked={formData.hasDocumentation}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, hasDocumentation: checked })
                      }
                      label="HAS DOCUMENTATION"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors font-mono font-bold dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white"
                    >
                      CREATE PROJECT
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          projectName: "",
                          description: "",
                          repository: "",
                          language: "",
                          license: "MIT",
                          isPublic: true,
                          hasDocumentation: false,
                        })
                      }
                      className="px-6 py-3 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-mono font-bold"
                    >
                      RESET
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
