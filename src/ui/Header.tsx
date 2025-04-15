import { useState } from "react";
import { GitFork, Menu, User2, X } from "lucide-react";
import { Link } from "react-router";
import Alert from "./Alert";
import { useOrg } from "../store/orgHook";

function Header() {
  const { orgData, loading } = useOrg();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white dark:bg-black dark:text-white border-b-4 border-black dark:border-white">
      <Alert />
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl font-mono">
          {orgData && !loading ? orgData.name : "Foxware-Den"}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* 
          <Link
            to="#"
            className="font-medium hover:underline underline-offset-4"
          >
            Projects
          </Link>
            TODO: add backend to manage later
          <Link
            to="#"
            className="font-medium hover:underline underline-offset-4"
          >
            Members
          </Link> 
          <Link
            to="#"
            className="font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
                TODO: add backend to manage later
            <Link
            to="#"
            className="font-medium hover:underline underline-offset-4"
          >
            Blog
          </Link>
          <Link
            to="#"
            className="font-medium hover:underline underline-offset-4"
          >
            Contact
          </Link> */}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          <button className="h-10 w-10 rounded-none border-2 border-black dark:border-white flex items-center justify-center">
            <a
              href={
                orgData ? orgData.html_url : "https://github.com/FoxwareDen"
              }
              target="_blank"
            >
              <GitFork className="h-5 w-5" />
            </a>
          </button>
          <button className="h-10 w-10 rounded-none border-2 border-black dark:border-white flex items-center justify-center">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/christopher-vos-6469b7284/"
            >
              <User2 className="h-5 w-5" />
            </a>
          </button>
        </div>

        {/* Mobile Navigation */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
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
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col py-8 px-6 space-y-6">
                <Link
                  to="/"
                  className="text-2xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                {/* 
                TODO: add backend to manage later
                <Link
                  to="#"
                  className="text-2xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Members
                </Link>
                <Link
                  to="#"
                  className="text-2xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                {/*
                TODO: add backend to manage later
                 <Link
                  to="#"
                  className="text-2xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  to="#"
                  className="text-2xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link> */}
              </nav>
              <div className="mt-auto border-t-4 border-black dark:border-white p-6 flex flex-col space-y-4">
                {/* TODO: <ThemeToggle /> */}
                <a
                  href={
                    orgData ? orgData.html_url : "https://github.com/FoxwareDen"
                  }
                  target="_blank"
                >
                  <button className="w-full border-2 border-black dark:border-white rounded-none h-14 flex items-center justify-center gap-2">
                    <GitFork className="h-5 w-5" />
                    GitFork
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
