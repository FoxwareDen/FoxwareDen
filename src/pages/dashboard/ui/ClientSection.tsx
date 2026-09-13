import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { createReviewPortal } from "../../../api/reviews";
import { useAlert } from "../../../ui/Alert";

export default function ClientSection() {
  const { setAlert } = useAlert();
  const [clientFormData, setClientFormData] = useState({
    clientName: "",
    clientEmail: "",
    expiresIn: "7",
  });
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);

  // Handler for generating client portal link
  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: add form validation
    const link = await createReviewPortal({
      invalidate_amount: Number(clientFormData.expiresIn.trim()),
      client_ref: clientFormData.clientName.trim(),
      email: clientFormData.clientEmail.trim(),
    });

    if (link) {
      setGeneratedLink(link);
      setClientFormData({
        clientName: "",
        clientEmail: "",
        expiresIn: "7",
      });
    } else {
      setAlert({ message: "failed to generate portal link", type: "error" });
    }
  };

  // Handler for copying link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <>
      {/* Client Portal Link Generator Section */}
      <div className="border border-foreground/10 rounded-2xl p-6 bg-card shadow-xl">
        <h2 className="text-2xl font-bold font-mono mb-6">
          GENERATE CLIENT PORTAL LINK
        </h2>

        <form onSubmit={handleGenerateLink} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Name */}
            <div>
              <label
                htmlFor="clientName"
                className="block font-mono font-bold mb-2"
              >
                CLIENT REF*
              </label>
              <input
                type="text"
                id="clientName"
                value={clientFormData.clientName}
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
                    clientName: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-foreground/10 rounded-xl bg-transparent focus:outline-none focus:outline-none focus:ring-2 focus:ring-vibrant-purple/50 focus:border-vibrant-purple"
                placeholder="Enter client name"
                required
              />
            </div>

            {/* Client Email */}
            <div>
              <label
                htmlFor="clientEmail"
                className="block font-mono font-bold mb-2"
              >
                CLIENT EMAIL *
              </label>
              <input
                type="email"
                id="clientEmail"
                value={clientFormData.clientEmail}
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
                    clientEmail: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-foreground/10 rounded-xl bg-transparent focus:outline-none focus:outline-none focus:ring-2 focus:ring-vibrant-purple/50 focus:border-vibrant-purple"
                placeholder="client@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Selection
            <div>
              <label
                htmlFor="projectId"
                className="block font-mono font-bold mb-2"
              >
                PROJECT *
              </label>
              <select
                id="projectId"
                value={clientFormData.projectId}
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
                    projectId: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-foreground/10 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-vibrant-purple/50 focus:border-vibrant-purple"
                required
              >
                <option value="">Select project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div> 
            */}

            {/* Link Expiration */}
            <div>
              <label
                htmlFor="expiresIn"
                className="block font-mono font-bold mb-2"
              >
                EXPIRES IN (DAYS) *
              </label>
              <select
                id="expiresIn"
                value={clientFormData.expiresIn}
                onChange={(e) =>
                  setClientFormData({
                    ...clientFormData,
                    expiresIn: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-foreground/10 rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-vibrant-purple/50 focus:border-vibrant-purple"
                required
              >
                <option value="1">1 Day</option>
                <option value="7">7 Days</option>
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
                <option value="365">1 Year</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-vibrant-purple to-vibrant-teal text-white shadow-lg hover:shadow-vibrant-purple/25 hover:-translate-y-0.5 transition-all font-mono font-bold"
          >
            GENERATE PORTAL LINK
          </button>
        </form>

        {/* Generated Link Display */}
        {generatedLink && (
          <div className="mt-6 p-4 border border-vibrant-amber/40 rounded-xl bg-vibrant-amber/15">
            <p className="font-mono font-bold mb-2 text-black">
              GENERATED PORTAL LINK:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={generatedLink}
                readOnly
                className="flex-1 px-4 py-2 rounded-lg border border-foreground/10 bg-background text-foreground font-mono text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-lg bg-foreground text-background hover:bg-vibrant-purple transition-colors font-mono font-bold flex items-center gap-2"
              >
                {linkCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    COPY
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-xs mt-2 text-black">
              Link expires in {clientFormData.expiresIn} day
              {clientFormData.expiresIn !== "1" ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
