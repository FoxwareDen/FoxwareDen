import { useState } from "react";
import Table from "./Table";
import FormData from "./FormData";

type TabType = "table" | "form";

function Tabs() {
  const [activeTab, setActiveTab] = useState<TabType>("table");

  return (
    <>
      {" "}
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
          {activeTab === "table" && <Table />}

          {activeTab === "form" && <FormData />}
        </div>
      </div>
    </>
  );
}

export default Tabs;
