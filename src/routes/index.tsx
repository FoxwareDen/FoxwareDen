import { createFileRoute } from '@tanstack/react-router'
import { useOrg } from '../store/orgHook';
import { useEffect } from 'react';
import { getOrgMetaData, heathCheck } from '../api/requests';
import { useAlert } from '../lib/ui/Alert';
import HeroSection from '../lib/ui/HeroSection';
import Services from '../lib/ui/Services';
import ReviewSection from '../lib/ui/ReviewsSection';
import TeamMembersSection from '../lib/ui/TeamMembersSection';
import TechnologyStacksSection from '../lib/ui/TechnologyStacksSection';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
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
