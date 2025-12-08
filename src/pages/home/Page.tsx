import Services from "../../ui/Services";
import HeroSection from "./ui/HeroSection";
import ReviewSection from "./ui/ReviewsSection";
import TeamMembersSection from "./ui/TeamMembersSection";
import TechnologyStacksSection from "./ui/TechnologyStacksSection";

function Home() {
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
