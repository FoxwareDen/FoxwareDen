import { useEffect, useState } from "react";
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
    <header className="w-full z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10 sticky top-0">
      <Alert />
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl font-mono group">
          <span className="bg-gradient-to-r from-vibrant-purple to-vibrant-teal bg-clip-text text-transparent group-hover:from-vibrant-teal group-hover:to-vibrant-amber transition-all duration-500">
            {orgData && !loading ? orgData.name : "Foxware-Den"}
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <DropdownProps label="Products" items={productRoutes} />
          <Link
            to="/about"
            className="font-medium text-foreground hover:text-vibrant-purple transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-vibrant-purple hover:after:w-full after:transition-all after:duration-300"
          >
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <a
            href={orgData ? orgData.html_url : "https://github.com/FoxwareDen"}
            target="_blank"
            aria-label="org repo link"
            className="h-10 w-10 rounded-lg border border-foreground/10 bg-background hover:bg-vibrant-purple/10 hover:border-vibrant-purple/30 flex items-center justify-center transition-all duration-300 group"
          >
            <GitFork className="h-5 w-5 text-foreground group-hover:text-vibrant-purple transition-colors" />
          </a>
          <button
            aria-label={authenticated ? "Dashboard link" : "Login link"}
            className="h-10 w-10 rounded-lg border border-foreground/10 bg-background hover:bg-vibrant-teal/10 hover:border-vibrant-teal/30 flex items-center justify-center transition-all duration-300 group"
            onClick={handleClickButton}
          >
            {authenticated ? (
              <NotepadTextIcon className="h-5 w-5 text-foreground group-hover:text-vibrant-teal transition-colors" />
            ) : (
              <User2 className="h-5 w-5 text-foreground group-hover:text-vibrant-teal transition-colors" />
            )}
          </button>
          {authenticated && (
            <button
              aria-label="log out button"
              className="h-10 w-10 rounded-lg border border-foreground/10 bg-background hover:bg-vibrant-pink/10 hover:border-vibrant-pink/30 flex items-center justify-center transition-all duration-300 group"
              onClick={signOut}
            >
              <LogOutIcon className="h-5 w-5 text-foreground group-hover:text-vibrant-pink transition-colors" />
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        <button
          aria-label="toggle navbar menu"
          className="md:hidden h-10 w-10 rounded-lg border border-foreground/10 flex items-center justify-center"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background animate-fade-in-up">
            <div className="h-full flex flex-col bg-background">
              <div className="h-20 border-b border-foreground/10 flex items-center px-6 justify-between">
                <span className="font-bold text-2xl font-mono bg-gradient-to-r from-vibrant-purple to-vibrant-teal bg-clip-text text-transparent">
                  {orgData && !loading ? orgData.name : "Foxware-Den"}
                </span>
                <button
                  aria-label="close navbar menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="h-10 w-10 rounded-lg border border-foreground/10 flex items-center justify-center hover:bg-foreground/5 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col py-8 px-6 space-y-6 overflow-y-auto">
                <Link
                  to="/"
                  className="text-2xl font-medium text-foreground hover:text-vibrant-purple transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <DropdownProps
                  className="text-xl font-bold"
                  items={productRoutes}
                  label="Products"
                  variant="mobile"
                  onItemClick={() => setIsMenuOpen(false)}
                />
                <Link
                  to="/about"
                  className="text-2xl font-medium text-foreground hover:text-vibrant-teal transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </nav>
              <div className="mt-auto border-t border-foreground/10 p-6 flex flex-col space-y-4">
                <a
                  href={
                    orgData ? orgData.html_url : "https://github.com/FoxwareDen"
                  }
                  target="_blank"
                >
                  <button
                    aria-label="link to orgs repo"
                    className="w-full border border-foreground/10 rounded-lg h-14 flex items-center justify-center gap-2 hover:bg-vibrant-purple/10 hover:border-vibrant-purple/30 transition-all group"
                  >
                    <GitFork className="h-5 w-5 group-hover:text-vibrant-purple transition-colors" />
                    <span className="group-hover:text-vibrant-purple transition-colors">
                      GitHub Repo
                    </span>
                  </button>
                </a>
                <div className="w-full border border-foreground/10 rounded-lg h-14 flex items-center justify-center gap-2">
                  <ThemeToggle className="border-0 h-full w-full" />
                  <span>Toggle Theme</span>
                </div>

                <button
                  aria-label={authenticated ? "Dashboard link" : "Login link"}
                  className="w-full border border-foreground/10 rounded-lg h-14 flex items-center justify-center gap-2 hover:bg-vibrant-teal/10 hover:border-vibrant-teal/30 transition-all group"
                  onClick={handleClickButton}
                >
                  {authenticated ? (
                    <>
                      <NotepadTextIcon className="h-5 w-5 group-hover:text-vibrant-teal transition-colors" />
                      <span className="group-hover:text-vibrant-teal transition-colors">
                        Dashboard
                      </span>
                    </>
                  ) : (
                    <>
                      <User2 className="h-5 w-5 group-hover:text-vibrant-teal transition-colors" />
                      <span className="group-hover:text-vibrant-teal transition-colors">
                        Login / Sign Up
                      </span>
                    </>
                  )}
                </button>
                {authenticated && (
                  <button
                    aria-label="log out button"
                    className="w-full border border-foreground/10 rounded-lg h-14 flex items-center justify-center gap-2 hover:bg-vibrant-pink/10 hover:border-vibrant-pink/30 transition-all group"
                    onClick={signOut}
                  >
                    <LogOutIcon className="h-5 w-5 group-hover:text-vibrant-pink transition-colors" />
                    <span className="group-hover:text-vibrant-pink transition-colors">
                      Logout
                    </span>
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
