import { useEffect, useRef, useState } from "react";
import "./FilterSidebar.css";
import Switch from "../../../../components/Switch/Switch";
import ClearIcon from "@mui/icons-material/Clear";
import DoneButton from "../DoneButton/DoneButton";
import { useTranslation } from "react-i18next";
import { toTitleCase } from "../../../../utils/custom_string";
import Backdrop from "../../../../components/Backdrop/Backdrop";

interface FilterSidebarProps {
  category: string;
  toggleFilter: boolean;
  handleToggleFilter: () => void;
  recentlyAdded: boolean;
  handleRecentlyAdded: () => void;
  categoryOptions: string[];
  selectedCategory: string;
  handelSelectedCategory: (value: string) => void;
  enableClearFilter: string | true;
  handleClearFilter: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  category,
  toggleFilter,
  handleToggleFilter,
  recentlyAdded,
  handleRecentlyAdded,
  categoryOptions,
  selectedCategory,
  handelSelectedCategory,
  enableClearFilter,
  handleClearFilter,
}) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1200);
  const prevIsMobileRef = useRef(isMobileView);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = window.innerWidth <= 1200;

      // Only update if crossing the 1200px threshold
      if (currentIsMobile !== prevIsMobileRef.current) {
        setIsMobileView(currentIsMobile);
        prevIsMobileRef.current = currentIsMobile;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (toggleFilter && isMobileView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [toggleFilter, isMobileView]);

  return (
    <>
      {/* 🔳 Backdrop only on mobile */}

      <Backdrop
        enable={toggleFilter && isMobileView}
        onClick={handleToggleFilter}
      />

      <aside className={`filter-sidebar ${toggleFilter && "active"}`}>
        <span className="close-filter-toggle" onClick={handleToggleFilter}>
          <ClearIcon />
        </span>
        <div className="recently-added">
          <Switch checked={recentlyAdded} onChange={handleRecentlyAdded} />
          <h4>{t("general.recentlyAdded")}</h4>
          <div
            className={`clear-filter ${enableClearFilter && "active"}`}
            onClick={() => {
              handleClearFilter();
              if (isMobileView) {
                handleToggleFilter();
              }
            }}
          >
            {t("general.clear")}
          </div>
        </div>
        <h2 className="category-title">{toTitleCase(category)}</h2>
        <div className="radio-list">
          <div>
            {categoryOptions.map((option) => (
              <label key={option} className="radio-option">
                <input
                  type="radio"
                  name={"radio-list"}
                  value={option}
                  checked={selectedCategory === option}
                  onChange={() => handelSelectedCategory(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
        {/* <DoneButton onClick={handleToggleFilter} /> */}
        {isMobileView && <DoneButton onClick={handleToggleFilter} />}
      </aside>
    </>
  );
};

export default FilterSidebar;
