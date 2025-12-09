import { Outlet } from "react-router";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { ThemeProvider } from "./lib/ThemeProvider";
import ScrollToTop from "./ui/ScrollToTop";

function RootLayout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
export default RootLayout;
