import { useEffect, useState } from "react";
// notepad - text;
import {
  GitFork,
  NotepadTextIcon,
  LogOutIcon,
  Menu,
  User2,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import Alert from "./Alert";
import { useOrg } from "../store/orgHook";
import ThemeToggle from "./ThemeToggle";
import { useUserSession } from "../store/auth";
import { signOutUser } from "../api/db";
import DropdownProps, { DropdownItem } from "./DropDown";
import { getRepos } from "../api/dashboard";

function Header() {
  const navigate = useNavigate();
  const { orgData, loading } = useOrg();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session, setSession } = useUserSession();
  const [authenticated, setAuthenticated] = useState(false);
  const [productRoutes, setProductRoutes] = useState<DropdownItem[]>([
    { href: "/froxtrail", label: "Foxtrail" },
  ]);

  useEffect(() => {
    const fetchRepos = async () => {
      const results = (await getRepos())?.map((r) => ({
        href: `/${r.title.toLocaleLowerCase()}`,
        label: r.title,
      }));

      if (!results) return;

      setProductRoutes(results);
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    if (session) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [session]);

  const handleClickButton = async () => {
    if (authenticated) {
      navigate("/Dashboard");
    } else {
      navigate("/login");
    }
  };

  const signOut = async () => {
    const res = await signOutUser();
    if (res) {
      setSession(null);
      navigate("/");
    }
  };

  return (
    <header className="fixed w-full z-50 bg-white dark:bg-black dark:text-white border-b-4 border-black dark:border-white">
      <Alert />
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl font-mono">
          {orgData && !loading ? orgData.name : "Foxware-Den"}
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <DropdownProps label="Products" items={productRoutes} />
          <Link
            to="/about"
            className="font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
          {/* <Link to="#" className="font-medium hover:underline underline-offset-4">
            Contact
          </Link> */}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <button
            aria-label="org repo link"
            className="h-10 w-10 rounded-none border-2 border-black dark:border-white flex items-center justify-center"
          >
            <a
              href={
                orgData ? orgData.html_url : "https://github.com/FoxwareDen"
              }
              target="_blank"
            >
              <GitFork className="h-5 w-5" />
            </a>
          </button>
          <button
            aria-label={authenticated ? "Dashboard link" : "Login link"}
            className="h-10 w-10 rounded-none border-2 border-black dark:border-white flex items-center justify-center"
            onClick={handleClickButton}
          >
            {authenticated ? (
              <NotepadTextIcon className="h-5 w-5" />
            ) : (
              <User2 className="h-5 w-5" />
            )}
          </button>
          {authenticated && (
            <button
              aria-label="log out button"
              className="h-10 w-10 rounded-none border-2 border-black dark:border-white flex items-center justify-center"
              onClick={signOut}
            >
              <LogOutIcon />
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        <button
          aria-label="toggle navbar menu"
          className="md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </button>

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white dark:bg-black">
            <div className="h-full flex flex-col">
              <div className="h-20 border-b-4 border-black dark:border-white flex items-center px-6 justify-between">
                <span className="font-bold text-2xl font-mono">
                  {orgData && !loading ? orgData.name : "Foxware-Den"}
                </span>
                <button
                  aria-label="close navbar menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col py-8 px-6 space-y-6 overflow-y-auto">
                <Link
                  to="/"
                  className="text-2xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <DropdownProps
                  className="text-1xl font-bold"
                  items={productRoutes}
                  label="PRODUCTS"
                />
                <Link
                  to="/about"
                  className="text-2xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                {/* <Link
                  to="#"
                  className="text-2xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link> */}
              </nav>
              <div className="mt-auto border-t-4 border-black dark:border-white p-6 flex flex-col space-y-4">
                <a
                  href={
                    orgData ? orgData.html_url : "https://github.com/FoxwareDen"
                  }
                  target="_blank"
                >
                  <button
                    aria-label="link to orgs repo"
                    className="w-full border-2 border-black dark:border-white rounded-none h-14 flex items-center justify-center gap-2"
                  >
                    <GitFork className="h-5 w-5" />
                    GitHub Repo
                  </button>
                </a>
                <button
                  aria-label="toggle theme button"
                  className="w-full border-2 border-black dark:border-white rounded-none h-14 flex items-center justify-center gap-2"
                >
                  <ThemeToggle className="border-0" />
                  Toggle Theme
                </button>

                <button
                  aria-label={authenticated ? "Dashboard link" : "Login link"}
                  className="w-full border-2 border-black dark:border-white rounded-none h-14 flex items-center justify-center gap-2"
                  onClick={handleClickButton}
                >
                  {authenticated ? (
                    <>
                      <NotepadTextIcon className="h-5 w-5" />
                      Dashboard
                    </>
                  ) : (
                    <>
                      <User2 className="h-5 w-5" />
                      Login / Sign Up
                    </>
                  )}
                </button>
                {authenticated && (
                  <button
                    aria-label="log out button"
                    className="w-full border-2 border-black dark:border-white rounded-none h-14 flex items-center justify-center gap-2"
                    onClick={signOut}
                  >
                    <LogOutIcon />
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
