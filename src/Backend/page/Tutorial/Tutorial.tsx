import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Container from "../../components/Container";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import Section from "../../components/Section";
import "./Tutorial.css";
import CloseIcon from "@mui/icons-material/Close";
import { Helmet } from "react-helmet";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";
import { ContentDataType } from "../../model/content_model";
import { capitalizeFirstLetter } from "../../utils/custom_string";
import Backdrop from "../../components/Backdrop/Backdrop";

interface TutorialProps {
  contentData: ContentDataType;
}

const Tutorial = ({ contentData }: TutorialProps) => {
  const { category } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeTopicRef = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation();

  // Helper function to get the current topic from the URL
  const getCurrenttopic = (): string => {
    const pathSegments = location.pathname.split("/");
    const encodedValue = pathSegments[pathSegments.length - 1];
    return decodeURIComponent(encodedValue);
  };

  const [currentTopic, setCurrentTopic] = useState(getCurrenttopic());

  // Update the current topic whenever the URL changes
  useEffect(() => {
    setCurrentTopic(getCurrenttopic());
  }, [location]);

  // Close the sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        showSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowSidebar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  // Scroll to the active topic whenever the current topic changes
  useEffect(() => {
    if (activeTopicRef.current) {
      activeTopicRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentTopic, showSidebar]);

  // Scroll to the top of the page when a new topic is selected
  useEffect(() => {
    scrollToTop();
  }, [currentTopic]);

  // Close the sidebar when the window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setShowSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Find the index of the current topic in the route
  const index = contentData.route!.findIndex(
    (content) => content.topic === currentTopic
  );
  const currentIndex = index !== -1 ? index : 0;

  // Get the previous and next topics based on the current topic's index
  const previousTopic =
    currentIndex > 0 ? contentData.route![currentIndex - 1].topic : null;
  const nextTopic =
    currentIndex < contentData.route!.length - 1
      ? contentData.route![currentIndex + 1].topic
      : null;

  // Handle keyboard navigation for left and right arrows
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleNavigation(previousTopic);
      } else if (event.key === "ArrowRight") {
        handleNavigation(nextTopic);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previousTopic, nextTopic]);

  // Navigation handler that updates the URL and scrolls to the top
  const handleNavigation = (topic: string | null) => {
    if (topic) {
      const newPath = `/${category}/${contentData.about.name}/${topic}`;
      navigate(newPath);
      setCurrentTopic(topic);
    }
  };

  // Helper function to scroll the page to the top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isSinglePage = !(contentData.route!.length === 1);

  return (
    <>
      <Helmet>
        <title>
          {contentData.about.name} - {t("tutorial.title")}
        </title>
        <meta
          name="description"
          content={t("tutorial.description", {
            course: contentData.about.name,
          })}
        />
      </Helmet>
      
      <Section className="tutorial-section">
        <Header
          onClick={() => setShowSidebar(true)}
          isShowTopicButton={isSinglePage}
        />

        <div className="content-wrapper">
          {/* Backdrop */}
          <Backdrop 
            enable={showSidebar} 
            className="tutorial-backdrop"
            onClick={() => setShowSidebar(false)}
          />

          {/* Content Sidebar */}
          {isSinglePage && (
            <aside
              className={`content-sidebar ${showSidebar ? "active" : ""}`}
              ref={sidebarRef}
            >
              <div className="sidebar-header">
                <h1 className="sidebar-title">{contentData.about.name}</h1>
                <button 
                  className="sidebar-close" 
                  onClick={() => setShowSidebar(false)}
                  aria-label="Close sidebar"
                >
                  <CloseIcon />
                </button>
              </div>
              
              <nav className="sidebar-nav">
                <ul className="nav-list">
                  {contentData.route!.map((content, index) => {
                    const isActive = content.topic === currentTopic;
                    const itemClass = content.type ? `nav-item ${content.type.toLowerCase()}` : "nav-item";
                    
                    return (
                      <li key={index} className={itemClass} ref={isActive ? activeTopicRef : null}>
                        {content.heading && (
                          <div className="nav-heading">{content.heading}</div>
                        )}
                        {content.subHeading && (
                          <div className="nav-subheading">{content.subHeading}</div>
                        )}
                        <NavLink
                          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                          end
                          to={`/${category}/${contentData.about.name}/${content.topic}`}
                          onClick={() => {
                            setCurrentTopic(content.topic);
                            setShowSidebar(false);
                            scrollToTop();
                          }}
                        >
                          {capitalizeFirstLetter(content.topic)}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          )}

          {/* Content Main */}
          <main className="content-main">
            <article className="content-article">
              <Outlet />
              
              <div className="navigation-buttons">
                <button
                  className={`nav-button ${!previousTopic ? "disabled" : ""}`}
                  onClick={() => handleNavigation(previousTopic)}
                  disabled={!previousTopic}
                >
                  <ArrowBackIosIcon />
                  <span className="nav-button-text">{t("tutorial.previous")}</span>
                </button>

                <button
                  className={`nav-button ${!nextTopic ? "disabled" : ""}`}
                  onClick={() => handleNavigation(nextTopic)}
                  disabled={!nextTopic}
                >
                  <span className="nav-button-text">{t("tutorial.next")}</span>
                  <ArrowForwardIosIcon />
                </button>
              </div>
            </article>
          </main>
        </div>
        
        <Footer />
      </Section>
    </>
  );
};

export default Tutorial;