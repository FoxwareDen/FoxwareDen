import { useState } from "react";
import Table from "./Table";
import FormData from "./FormData";

type TabType = "table" | "form";

function Tabs() {
  const [activeTab, setActiveTab] = useState<TabType>("table");

  return (
    <>
      {" "}
      <div className="border border-foreground/10 mb-0 bg-card rounded-2xl shadow-xl overflow-hidden">
        <div className="flex border-b border-foreground/10">
          <button
            aria-label="table tab"
            onClick={() => setActiveTab("table")}
            className={`flex-1 px-6 py-4 font-mono font-bold transition-colors border-r border-foreground/10 ${
              activeTab === "table"
                ? "bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white"
                : "bg-card text-foreground hover:bg-muted"
            }`}
          >
PRODUCTS TABLE
          </button>
          <button
            aria-label="form tab"
            onClick={() => setActiveTab("form")}
            className={`flex-1 px-6 py-4 font-mono font-bold transition-colors ${
              activeTab === "form"
                ? "bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white"
                : "bg-card text-foreground hover:bg-muted"
            }`}
          >
ADD PRODUCT
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
