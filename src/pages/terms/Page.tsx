import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <header className="border-b-4 border-black dark:border-white">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-2 border-black dark:border-white px-4 py-2 transition-colors"
          >
            <ArrowLeft size={16} />
            BACK TO HOME
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="mb-16">
          <div className="border-4 border-black dark:border-white p-8 -rotate-1 bg-white dark:bg-black">
            <h1 className="font-mono text-5xl md:text-7xl font-bold mb-4">
              TERMS OF
              <br />
              AGREEMENT
            </h1>
            <p className="font-mono text-lg">Last Updated: 11/08/2025</p>
          </div>
        </div>

        {/* Terms Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          <TermsSection heading="A. ACCEPTANCE OF TERMS">
            <TermsParagraph>
              By accessing and using FoxWareDen's services, websites, and
              applications, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the
              below, please do not use this service.
            </TermsParagraph>
          </TermsSection>

          <TermsSection heading="B. Prohibited Use and Immediate Termination">
            <TermsList
              list={[
                "Compliance with Law: The Customer agrees to use the services provided, strictly for legal and authorized purposes and in compliance with all applicable local, provincial, and national laws and regulations.",
                "Prohibited Activity: The Customer is strictly prohibited from using or attempting to use the service, or the presence of our technicians, to engage in, facilitate, or cover any illegal, fraudulent, or criminal activity whatsoever. This includes, but is not limited to, the sale, storage, or facilitation of illegal goods, materials, or services.",
                "Right to Refuse and Terminate: The Service Provider reserves the right, in its sole discretion and without prior notice, to immediately suspend or permanently terminate this maintenance agreement and refuse all future services if we determine or reasonably suspect that the Customer is violating or has violated this Prohibited Use clause.",
                "No Refund: In the event of termination under this clause, the Customer forfeits all prepaid fees and payments for the unused portion of the service period.",
              ]}
            />
          </TermsSection>

          <TermsSection heading="Section Y: Imposition of Fines and Penalties and Indemnification">
            <TermsList
              list={[
                "Liability for Costs: In addition to termination, the Customer shall be solely responsible and liable for any and all costs, expenses, fees, or damages incurred by the Service Provider as a direct or indirect result of the Customer's breach of Section X (Prohibited Use and Immediate Termination).",
                "Open-Ended Fine/Penalty: The Customer agrees to pay the Service Provider a financial penalty/fine equal to the total sum of all damages and costs incurred, including, but not limited to:",
                [
                  "The full amount of any governmental, regulatory, or civil fines, penalties, or assessments levied against the Service Provider.",
                  "Any legal fees, court costs, administrative fees, and investigative expenses incurred by the Service Provider.",
                ],
                "Indemnification: The Customer agrees to indemnify, defend, and hold harmless the Service Provider against any and all claims, actions, losses, liabilities, costs, and expenses (including legal fees) arising from or relating to the Customer's illegal activity or misuse of the services.",
                "Payment Obligation: Payment for these fines, penalties, and associated costs is due immediately upon the Service Provider's issuance of an itemised invoice.",
              ]}
            />
          </TermsSection>

          <TermsSection heading="Section Z: Price Adjustments and Notice">
            <TermsList
              list={[
                "Future Price Changes: The Service Provider reserves the right to modify the pricing structure, subscription fees, and renewal rates for any or all Maintenance Plans (Quarterly, Semi-Annual, Annual) at any time.",
                "Notice Requirement: The Service Provider will provide the Customer with a minimum of forty-five (45) calendar days' notice prior to the date any price change takes effect.",
                "Customer Action: The Customer's continued use of the services after the expiration of the 45-day notice period will constitute the Customer's acceptance of the new pricing. If the Customer does not agree to the new rates, they may terminate the agreement effective prior to the new rates taking effect",
              ]}
            />
          </TermsSection>
        </div>
      </main>
    </div>
  );
}

function TermsSection({
  heading,
  children,
}: {
  heading: string;
  children?: ReactNode | string;
}) {
  return (
    <section className="border-l-4 border-black dark:border-white pl-6">
      <h2 className="font-mono text-2xl font-bold mb-4">{heading}</h2>
      {children}
    </section>
  );
}

function TermsParagraph({ children }: { children: string }) {
  return <p className="font-mono leading-relaxed mb-4">{children}</p>;
}

type TermItem = string | TermItem[];

function TermsList({
  type = "dot",
  list,
}: {
  type?: string;
  list: TermItem[];
}) {
  return (
    <div className=" space-y-2 font-mono">
      {list.map((item, i) => (
        <>
          {typeof item === "string" ? (
            <div className="flex">
              <div className="ml-4 mr-2">{type == "dot" ? `${i}.` : "*"}</div>
              <div key={i}>{item}</div>
            </div>
          ) : (
            <div className="list-none space-y-2 font-mono ml-4 pl-6">
              <TermsList type={type == "dot" ? "num" : "dot"} list={item} />
            </div>
          )}
        </>
      ))}
    </div>
  );
}
