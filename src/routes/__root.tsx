import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ThemeProvider } from '../lib/ThemeProvider';
import SEOProvider from '../lib/SEOProvider';
import Header from '../lib/ui/Header';
import Footer from '../lib/ui/Footer';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  
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
        {/* <ScrollToTop /> */}
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
