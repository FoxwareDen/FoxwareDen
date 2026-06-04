import { Outlet } from "react-router";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { ThemeProvider } from "./lib/ThemeProvider";
import ScrollToTop from "./ui/ScrollToTop";
import SEOProvider from "./lib/SEOProvider";

function RootLayout() {

  return (
    <ThemeProvider>
      <SEOProvider product={{
        keywords: [
          "software development",
          "web development",
          "mobile app development",
          "business solutions",
          "custom software",
          "web applications",
          "software company",
          "app development",
          "digital transformation"
        ],
        title: "FoxwareDen - Custom Software Development & Business Solutions",
        name: "FoxwareDen",
        description: "Build business solutions with cutting-edge technology.",
        type: "website",
        image: "https://foxwareden.co.za/favicon-96x96.png",
        url: "https://foxwareden.co.za",
      }} />
      <div className="min-h-screen bg-background text-foreground">
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
export default RootLayout;
