import Services from "../../ui/Services";
import HeroSection from "./ui/HeroSection";
import TeamMembersSection from "./ui/TeamMembersSection";
import TechnologyStacksSection from "./ui/TechnologyStacksSection";

function Home() {
  return (
    <>
      <HeroSection />
      <Services />
      {/* <ProjectsSection /> */}
      <TeamMembersSection />
      <TechnologyStacksSection />
    </>
  );
}

export default Home;
