import React, { useState } from "react";
import BrutalistSwitch from "../../../ui/Switch";
import { createRepo, Repo, Status } from "../../../api/dashboard";

function FormData() {
  const [loading, setLoading]= useState(false)
  // Form state
  const [formData, setFormData] = useState<Repo>({
    contributors: 0,
    description: "",
    repository_url:"",
    status:"pending",
    title: "",
    public:false
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true)

      createRepo(formData)

      setFormData({
        contributors: 0,
        description: "",
        public: false,
        repository_url:"",
        status:"active",
        title:""
      })
      setLoading(false);  
    } catch (error) {
      
    }finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-mono mb-6">CREATE NEW PROJECT</h2>

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
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
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
            value={formData.repository_url}
            onChange={(e) =>
              setFormData({ ...formData, repository_url: e.target.value })
            }
            className="w-full px-4 py-3 border-2 border-black dark:border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            placeholder="https://github.com/username/repo"
            required
          />
        </div>

        {/* Language & License */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div>
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
          </div> */}

          {/* <div>
            <label htmlFor="license" className="block font-mono font-bold mb-2">
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
          </div> */}
        </div>

        {/* Switches */}
        <div className="space-y-4 border-2 border-black dark:border-white p-4">
          <div>
            <label htmlFor="license" className="block font-mono font-bold mb-2">
              Statius *
            </label>
            <select
              id="license"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as Status | "pending" })
              }
              className="w-full px-4 py-3 border-2 border-black dark:border-white bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              required
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
              <option value="pending">pending</option>
            </select>
          </div> 
          <BrutalistSwitch
            checked={formData.public}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, public: checked })
            }
            className={`${formData.public ? "border-2 border-green-500 bg-green-500 dark:border-green-500 dark:bg-green-500":  "border-2 border-red-500 bg-red-500 dark:border-red-500 dark:bg-red-500"}`}
            label="PUBLIC REPOSITORY"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            disabled={loading}
            type="submit"
            className="flex-1 py-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors font-mono font-bold dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white"
          >
            CREATE PROJECT
          </button>
          {/* <button
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
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default FormData;
