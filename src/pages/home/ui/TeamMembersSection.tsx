import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import MemberCard from "./MemberCard";
import { useState } from "react";

type TeamMembers = {
  name: string;
  role: string;
  image?: string;
  github: string;
};

function TeamMembersSection() {
  // TODO: replace with actual data later in development
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([
    {
      name: "Alex Johnson",
      role: "Core Maintainer",
      github: "#",
    },
    {
      name: "Samantha Lee",
      role: "Frontend Lead",
      github: "#",
    },
    {
      name: "Marcus Chen",
      role: "Backend Developer",
      github: "#",
    },
    {
      name: "Priya Patel",
      role: "UI/UX Designer",
      github: "#",
    },
    {
      name: "James Wilson",
      role: "DevOps Engineer",
      github: "#",
    },
    {
      name: "Zoe Garcia",
      role: "Documentation Lead",
      github: "#",
    },
    {
      name: "David Kim",
      role: "Security Specialist",
      github: "#",
    },
    {
      name: "Emma Thompson",
      role: "Community Manager",
      github: "#",
    },
  ]);
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
              MEMBERS
            </h2>
            <p className="text-lg max-w-2xl">
              Meet the talented individuals behind our open-source projects.
            </p>
          </div>
          <Link
            to="#"
            className="inline-flex items-center mt-4 md:mt-0 text-lg font-bold hover:underline"
          >
            Join Our Team <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <MemberCard
              key={index}
              name={member.name}
              role={""}
              image={member.image || "/hackermans.webp"}
              github={member.github}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamMembersSection;
