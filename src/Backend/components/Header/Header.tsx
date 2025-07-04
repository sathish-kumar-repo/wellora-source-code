import React, { useState, useEffect, useRef, useMemo } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
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
      const toggleBuffer = 200; // Increased buffer for theme toggle and other controls

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
      <header className={`modern-header ${isHomePage ? "home" : "course"}`}>
        <div className="header-left">
          {isShowTopicButton && (
            <button className="header-btn sidebar-toggle lg:hidden" onClick={onClick}>
              <ClearAllIcon />
            </button>
          )}
          <NavLink to="/" className="header-logo">
            <span className="logo-text">{t("header.logo")}</span>
          </NavLink>
        </div>

        <nav ref={navRef} className="header-nav">
          <ul className="nav-list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                Home
              </NavLink>
            </li>

            {visibleFolders.map((folder) => (
              <li key={folder}>
                <NavLink 
                  to={`/${folder}`} 
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  {toTitleCase(folder)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-right">
          <button className="header-btn" onClick={() => setShowSearch(true)}>
            <SearchIcon />
          </button>

          <ThemeToggle size="sm" />

          {overflowFolders.length > 0 && (
            <button
              className="header-btn"
              onClick={() => setShowOffCanvas(true)}
            >
              <MoreHorizIcon />
            </button>
          )}

          {isShowTopicButton && (
            <button className="header-btn sidebar-toggle hidden lg:flex" onClick={onClick}>
              <ClearAllIcon />
            </button>
          )}
        </div>
      </header>

      <Search
        showSearch={showSearch}
        ref={searchRef}
        onClose={() => setShowSearch(false)}
      />

      <Backdrop enable={showOffCanvas} />

      <div
        className={`header-offcanvas ${showOffCanvas ? "active" : ""}`}
        ref={offCanvasRef}
      >
        <div className="offcanvas-header">
          <h3>{t("header.moreFolders")}</h3>
          <button className="header-btn" onClick={() => setShowOffCanvas(false)}>
            <CloseIcon />
          </button>
        </div>
        <ul className="offcanvas-list">
          {overflowFolders.map((folder) => {
            const basePath = location.pathname.split("/")[1];
            const isActive = basePath === folder;

            return (
              <li key={folder}>
                <NavLink
                  to={`/${folder}`}
                  ref={isActive ? activeItemRef : null}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={() => setShowOffCanvas(false)}
                >
                  {toTitleCase(folder)}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};