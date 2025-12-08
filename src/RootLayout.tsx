import { Outlet } from "react-router";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { ThemeProvider } from "./lib/ThemeProvider";

function RootLayout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
export default RootLayout;
