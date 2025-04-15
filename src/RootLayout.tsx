import { Outlet } from "react-router";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { useEffect } from "react";
import { getOrgMetaData, heathCheck } from "./api/requests";
import { useAlert } from "./ui/Alert";
import { useOrg } from "./store/orgHook";
import { ThemeProvider } from "./lib/ThemeProvider";

function RootLayout() {
  const { setAlert } = useAlert();
  const { setData, setLoading, setError } = useOrg();

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
      } catch (error) {
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
