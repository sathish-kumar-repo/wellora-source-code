import React, { useState, useEffect, useRef, useMemo } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import MainData from "../../../Main/data";
import { NavLink, useLocation } from "react-router-dom";
import Search from "../Search/Search";
import { useTranslation } from "react-i18next";
import { toTitleCase } from "../../utils/custom_string";
import Backdrop from "../Backdrop/Backdrop";
import { usePrivateTab } from "../../context/PrivateTabContext";
import privateTabs from "../../../Main/private_tabs";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

interface HeaderProps {
  onClick?: () => void;
  isShowTopicButton?: boolean;
  isHomePage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onClick,
  isShowTopicButton = false,
  isHomePage = false,
}) => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [visibleFolders, setVisibleFolders] = useState<string[]>([]);
  const [overflowFolders, setOverflowFolders] = useState<string[]>([]);

  const navRef = useRef<HTMLUListElement>(null);
  const offCanvasRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);

  const location = useLocation();
  const { t } = useTranslation();
  const { isPrivate } = usePrivateTab();

  // 🔒 Filter folders based on private mode
  const filteredMainData = useMemo(() => {
    return Object.fromEntries(
      Object.entries(MainData).filter(
        ([key]) => isPrivate || !privateTabs.includes(key)
      )
    );
  }, [isPrivate]);

  useEffect(() => {
    if (showOffCanvas && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showOffCanvas]);

  useEffect(() => {
    const calculateFolders = () => {
      const headerEl = document.querySelector("header");
      if (!headerEl || !navRef.current) return;

      const containerWidth = headerEl.clientWidth;
      const homeLink = navRef.current.querySelector("li") as HTMLLIElement;
      const toggleBuffer = 200;

      let usedWidth = homeLink?.offsetWidth || 0;
      const visible: string[] = [];
      const overflow: string[] = [];

      Object.keys(filteredMainData).map((courseName) => {
        const temp = document.createElement("span");
        temp.style.visibility = "hidden";
        temp.style.position = "absolute";
        temp.style.whiteSpace = "nowrap";
        temp.style.fontSize = "0.875rem";
        temp.style.fontWeight = "500";
        temp.style.padding = "0.75rem 1rem";
        temp.innerText = courseName;
        document.body.appendChild(temp);

        const folderWidth = temp.offsetWidth + 20;
        document.body.removeChild(temp);

        if (usedWidth + folderWidth + toggleBuffer <= containerWidth) {
          visible.push(courseName);
          usedWidth += folderWidth;
        } else {
          overflow.push(courseName);
        }
      });

      setVisibleFolders(visible);
      setOverflowFolders(overflow);
    };

    calculateFolders();
    window.addEventListener("resize", calculateFolders);
    return () => window.removeEventListener("resize", calculateFolders);
  }, [filteredMainData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const event = new Event("resize");
      window.dispatchEvent(event);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (overflowFolders.length <= 0) {
      setShowOffCanvas(false);
    }
  }, [overflowFolders]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        showOffCanvas &&
        offCanvasRef.current &&
        !offCanvasRef.current.contains(event.target as Node)
      ) {
        setShowOffCanvas(false);
      }
      if (
        showSearch &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOffCanvas, showSearch]);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl transition-all duration-300 ${
        isHomePage 
          ? "relative mx-4 mt-4 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 shadow-lg" 
          : ""
      }`}>
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">
            {/* Left section */}
            <div className="flex items-center gap-4">
              {isShowTopicButton && (
                <button 
                  onClick={onClick}
                  className="lg:hidden btn btn-ghost btn-sm"
                  aria-label="Open sidebar"
                >
                  <ClearAllIcon className="h-5 w-5" />
                </button>
              )}
              <NavLink 
                to="/" 
                className="flex items-center gap-2 text-xl font-bold text-gradient hover:scale-105 transition-transform duration-200 no-underline"
              >
                {t("header.logo")}
              </NavLink>
            </div>

            {/* Center navigation */}
            <nav className="hidden lg:flex items-center space-x-1" ref={navRef}>
              <ul className="flex items-center space-x-1">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => 
                      `nav-link ${isActive ? "nav-link-active" : ""}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                {visibleFolders.map((folder) => (
                  <li key={folder}>
                    <NavLink 
                      to={`/${folder}`} 
                      className={({ isActive }) => 
                        `nav-link ${isActive ? "nav-link-active" : ""}`
                      }
                    >
                      {toTitleCase(folder)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowSearch(true)}
                className="btn btn-ghost btn-sm"
                aria-label="Search"
              >
                <SearchIcon className="h-5 w-5" />
              </button>

              <ThemeToggle />

              {overflowFolders.length > 0 && (
                <button
                  onClick={() => setShowOffCanvas(true)}
                  className="btn btn-ghost btn-sm"
                  aria-label="More options"
                >
                  <MoreHorizIcon className="h-5 w-5" />
                </button>
              )}

              {isShowTopicButton && (
                <button 
                  onClick={onClick}
                  className="hidden lg:flex btn btn-ghost btn-sm"
                  aria-label="Toggle sidebar"
                >
                  <ClearAllIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <Search
        showSearch={showSearch}
        ref={searchRef}
        onClose={() => setShowSearch(false)}
      />

      {/* Backdrop */}
      <Backdrop enable={showOffCanvas} />

      {/* Off-canvas menu */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 max-w-full transform bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out ${
          showOffCanvas ? "translate-x-0" : "translate-x-full"
        }`}
        ref={offCanvasRef}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t("header.moreFolders")}
            </h3>
            <button 
              onClick={() => setShowOffCanvas(false)}
              className="btn btn-ghost btn-sm"
              aria-label="Close menu"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              {overflowFolders.map((folder) => {
                const basePath = location.pathname.split("/")[1];
                const isActive = basePath === folder;

                return (
                  <li key={folder}>
                    <NavLink
                      to={`/${folder}`}
                      ref={isActive ? activeItemRef : null}
                      className={`block w-full rounded-lg px-4 py-3 text-left font-medium transition-colors duration-200 no-underline ${
                        isActive
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                          : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setShowOffCanvas(false)}
                    >
                      {toTitleCase(folder)}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};