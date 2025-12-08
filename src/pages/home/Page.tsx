import { useEffect } from "react";
import { useOrg } from "../../store/orgHook";
import { useAlert } from "../../ui/Alert";
import Services from "../../ui/Services";
import HeroSection from "./ui/HeroSection";
import ReviewSection from "./ui/ReviewsSection";
import TeamMembersSection from "./ui/TeamMembersSection";
import TechnologyStacksSection from "./ui/TechnologyStacksSection";
import { getOrgMetaData, heathCheck } from "../../api/requests";

function Home() {
  const { setData, setLoading, setError } = useOrg();
  const { setAlert } = useAlert();

  useEffect(() => {
    const fetchOrgData = async () => {
      setLoading(true);
      setError(null);
      const [error, message] = await heathCheck();

      if (error) {
        setAlert({ message, type: "error" }, 10000);

        return;
      }

      try {
        const orgData = await getOrgMetaData();

        setData(orgData);
      } catch {
        setAlert(
          {
            message: "failed to retrieve org data from github api",
            type: "error",
          },
          20000
        );
        setError("failed to retrieve org data from github api");
      } finally {
        setLoading(false);
      }
    };

    fetchOrgData();
  }, []);

  return (
    <>
      <HeroSection />
      <Services />
      <ReviewSection />
      <TeamMembersSection />
      <TechnologyStacksSection />
    </>
  );
}

export default Home;
