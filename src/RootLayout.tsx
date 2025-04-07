import { Outlet } from "react-router";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { useEffect } from "react";
import { heathCheck } from "./api/requests";
import { useAlert } from "./ui/Alert";

function RootLayout() {
  const { setAlert } = useAlert();

  useEffect(() => {
    const fetchReq = async () => {
      const [error, message] = await heathCheck();

      setAlert({ message, type: error ? "success" : "error" }, 15000);
    };

    fetchReq();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default RootLayout;
