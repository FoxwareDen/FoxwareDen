import { Outlet } from "react-router";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { useEffect } from "react";
import { getOrgMetaData, heathCheck } from "./api/requests";
import { useAlert } from "./ui/Alert";
import { useOrg } from "./store/orgHook";
import { ThemeProvider } from "./lib/ThemeProvider";
import { useUserSession } from "./store/auth";

function RootLayout() {
  const { session, setSession } = useUserSession();
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
  }, [setAlert, setLoading, setData, setError]);

  useEffect(() => {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    } else {
      const session = localStorage.getItem("session");
      if (session) {
        const parsedSession = JSON.parse(session);
        if (parsedSession) {
          setSession(parsedSession);
        }
      }
    }
  }, [session, setSession]);

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
