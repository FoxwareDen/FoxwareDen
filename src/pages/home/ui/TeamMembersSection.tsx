import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import MemberCard from "./MemberCard";
import { useEffect, useState } from "react";
import { useOrg } from "../../../store/orgHook";
import { getWithAuth, User } from "../../../api/requests";
import Loading from "../../../ui/Loading";
import ErrorSection from "../../../ui/ErrorSection";

type TeamMembers = {
  name: string;
  role: string;
  image?: string;
  github: string;
};

function TeamMembersSection() {
  const { loading, orgData } = useOrg();
  // TODO: replace with actual data later in development
  const [teamMembersLoading, setTeamMembersLoading] = useState(false);
  const [teamMembersError, setTeamMembersError] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMembers[] | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      if (loading) return;
      if (!orgData?.members_url) return;

      try {
        setTeamMembersLoading(true);
        setTeamMembersError(null);

        const url = orgData.members_url.split("{")[0];

        const [res, error] = await getWithAuth<{
          message: string;
          data: User[];
        }>(url);

        if (error || !res)
          throw new Error("Failed to get members list from api");

        const members = res.data.map((user) => {
          return {
            name: user.login,
            role: user.site_admin ? "Admin" : "Developer",
            image: user.avatar_url,
            github: user.html_url,
          } as TeamMembers;
        });

        setTeamMembers(members);
      } catch (error) {
        console.error(error);
        setTeamMembersError(`${error}`);
      } finally {
        setTeamMembersLoading(false);
      }
    };

    fetchMembers();
  }, [loading]);

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
          {/* 
          TODO: create a way to join later
          <Link
            to="https://github.com/orgs/FoxwareDen/"
            className="inline-flex items-center mt-4 md:mt-0 text-lg font-bold hover:underline"
          >
            Join Our Team <ChevronRight className="ml-1 h-5 w-5" />
          </Link> */}
        </div>

        {teamMembersLoading || teamMembers == null ? (
          <>
            <Loading text="Loading TeamMembers" />
          </>
        ) : teamMembersError ? (
          <>
            <ErrorSection message={teamMembersError} type="error" />
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <MemberCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image || "/hackermans.webp"}
                github={member.github}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TeamMembersSection;
