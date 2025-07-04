import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
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
      
      <div className="min-h-screen bg-white dark:bg-secondary-950 flex flex-col">
        <Header
          onClick={() => setShowSidebar(true)}
          isShowTopicButton={isSinglePage}
        />

        <div className="flex flex-1 max-w-screen-2xl mx-auto w-full">
          {/* Backdrop */}
          <Backdrop 
            enable={showSidebar} 
            onClick={() => setShowSidebar(false)}
          />

          {/* Content Sidebar */}
          {isSinglePage && (
            <aside
              className={`
                fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out
                lg:relative lg:inset-auto lg:z-auto lg:translate-x-0 lg:w-80
                bg-white dark:bg-secondary-900 border-r border-secondary-200 dark:border-secondary-800
                ${showSidebar ? "translate-x-0" : "-translate-x-full"}
              `}
              ref={sidebarRef}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-secondary-200 dark:border-secondary-800 p-6">
                  <h1 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 truncate">
                    {contentData.about.name}
                  </h1>
                  <button 
                    className="lg:hidden btn btn-ghost btn-sm"
                    onClick={() => setShowSidebar(false)}
                    aria-label="Close sidebar"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                </div>
                
                <nav className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-1">
                    {contentData.route!.map((content, index) => {
                      const isActive = content.topic === currentTopic;
                      const indentLevel = content.type === "H2" ? 1 : content.type === "H3" ? 2 : 0;
                      
                      return (
                        <li key={index} ref={isActive ? activeTopicRef : null}>
                          {content.heading && (
                            <div className="px-3 py-2 text-xs font-semibold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                              {content.heading}
                            </div>
                          )}
                          {content.subHeading && (
                            <div className="px-3 py-1 text-xs text-secondary-600 dark:text-secondary-400 ml-4">
                              • {content.subHeading}
                            </div>
                          )}
                          <NavLink
                            to={`/${category}/${contentData.about.name}/${content.topic}`}
                            className={({ isActive }) => `
                              block w-full rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
                              ${indentLevel === 1 ? "ml-4" : indentLevel === 2 ? "ml-8" : ""}
                              ${isActive 
                                ? "bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-400 border-l-2 border-primary-500" 
                                : "text-secondary-700 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-800 hover:text-secondary-900 dark:hover:text-secondary-100"
                              }
                            `}
                            onClick={() => {
                              setCurrentTopic(content.topic);
                              setShowSidebar(false);
                              scrollToTop();
                            }}
                          >
                            <div className="flex items-center gap-2">
                              {indentLevel > 0 && (
                                <div className="w-1 h-1 rounded-full bg-current opacity-60" />
                              )}
                              {capitalizeFirstLetter(content.topic)}
                            </div>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>
          )}

          {/* Content Main */}
          <main className="flex-1 min-w-0">
            <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
              <article className="prose prose-secondary dark:prose-invert max-w-none">
                <Outlet />
              </article>
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-800">
                <button
                  onClick={() => handleNavigation(previousTopic)}
                  disabled={!previousTopic}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${previousTopic 
                      ? "text-secondary-700 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-secondary-100 hover:bg-secondary-50 dark:hover:bg-secondary-800" 
                      : "text-secondary-400 dark:text-secondary-600 cursor-not-allowed"
                    }
                  `}
                >
                  <ArrowBackIosIcon className="h-4 w-4" />
                  <span className="text-sm">{t("tutorial.previous")}</span>
                </button>

                <button
                  onClick={() => handleNavigation(nextTopic)}
                  disabled={!nextTopic}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${nextTopic 
                      ? "text-secondary-700 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-secondary-100 hover:bg-secondary-50 dark:hover:bg-secondary-800" 
                      : "text-secondary-400 dark:text-secondary-600 cursor-not-allowed"
                    }
                  `}
                >
                  <span className="text-sm">{t("tutorial.next")}</span>
                  <ArrowForwardIosIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Tutorial;