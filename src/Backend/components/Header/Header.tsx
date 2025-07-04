import React, { useState, useEffect, useRef, useMemo } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import "./Header.css";
import MainData from "../../../Main/data";
import { NavLink, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Search from "../Search/Search";
import { useTranslation } from "react-i18next";
import { toTitleCase } from "../../utils/custom_string";
import Backdrop from "../Backdrop/Backdrop";
import { usePrivateTab } from "../../context/PrivateTabContext";
import privateTabs from "../../../Main/private_tabs";

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
      const toggleBuffer = 60;

      let usedWidth = homeLink?.offsetWidth || 0;
      const visible: string[] = [];
      const overflow: string[] = [];

      Object.keys(filteredMainData).map((courseName) => {
        const temp = document.createElement("span");
        temp.style.visibility = "hidden";
        temp.style.position = "absolute";
        temp.style.whiteSpace = "nowrap";
        temp.style.fontSize = "1rem";
        temp.style.fontWeight = "500";
        temp.style.padding = "8px 15px";
        temp.innerText = courseName;
        document.body.appendChild(temp);

        const folderWidth = temp.offsetWidth + 300;
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
      <header className={`header ${isHomePage ? "home" : "course"}`}>
        <div className="menu-logo">
          {isShowTopicButton && (
            <div className="toggle-button logo-toggle" onClick={onClick}>
              <ClearAllIcon />
            </div>
          )}
          <NavLink to="/" className="logo">
            {t("header.logo")}
          </NavLink>
        </div>

        <ul ref={navRef} className="nav-links">
          {isShowTopicButton && (
            <li className="toggle-button nav-toggle" onClick={onClick}>
              <ClearAllIcon />
            </li>
          )}

          <li key="Home">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>

          {visibleFolders.map((folder) => (
            <li key={folder}>
              <NavLink to={`/${folder}`}>{toTitleCase(folder)}</NavLink>
            </li>
          ))}

          <li className="toggle-button" onClick={() => setShowSearch(true)}>
            <SearchIcon />
          </li>

          {overflowFolders.length > 0 && (
            <li
              className="toggle-button"
              onClick={() => setShowOffCanvas(true)}
            >
              <MoreHorizIcon />
            </li>
          )}
        </ul>
      </header>

      <Search
        showSearch={showSearch}
        ref={searchRef}
        onClose={() => setShowSearch(false)}
      />

      <Backdrop enable={showOffCanvas} />

      <div
        className={`off-canvas-glass ${showOffCanvas ? "active" : ""}`}
        ref={offCanvasRef}
      >
        <div className="off-canvas-header">
          <h3>{t("header.moreFolders")}</h3>
          <span>
            <CloseIcon onClick={() => setShowOffCanvas(false)} />
          </span>
        </div>
        <ul className="off-canvas-list">
          {overflowFolders.map((folder) => {
            const basePath = location.pathname.split("/")[1];
            const isActive = basePath === folder;

            return (
              <li key={folder}>
                <NavLink
                  to={`/${folder}`}
                  ref={isActive ? activeItemRef : null}
                  onClick={() => {
                    setShowOffCanvas(false);
                  }}
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
