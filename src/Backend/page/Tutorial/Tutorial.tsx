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
  const [showTopic, setShowTopic] = useState(false);
  const offCanvasRef = useRef<HTMLDivElement>(null);
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

  // Close the topic menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        showTopic &&
        offCanvasRef.current &&
        !offCanvasRef.current.contains(event.target as Node)
      ) {
        setShowTopic(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTopic]);

  // Scroll to the active topic whenever the current topic changes
  useEffect(() => {
    if (activeTopicRef.current) {
      activeTopicRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentTopic, showTopic]); // Dependency to update when currentTopic changes

  // Scroll to the top of the page when a new topic is selected
  useEffect(() => {
    scrollToTop();
  }, [currentTopic]);

  // Close the topic menu when the window is resized
  useEffect(() => {
    const handleFn = () => setShowTopic(false);
    window.addEventListener("resize", handleFn);
    return () => window.removeEventListener("resize", handleFn);
  }, []);

  // Find the index of the current topic in the route
  const index = contentData.route!.findIndex(
    (content) => content.topic === currentTopic
  );
  const currentIndex = index !== -1 ? index : 0; // Default to 0 if not found

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
      setCurrentTopic(topic); // Update the current topic state
      // scrollToTop(); // Scroll to the top of the page
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
          onClick={() => setShowTopic(true)}
          isShowTopicButton={isSinglePage}
        />

        <Container className="content-wrapper">
          {/* Backdrop */}
          <Backdrop enable={showTopic} className="tutorial-backdrop" />

          {/* Content Topic */}
          {isSinglePage && (
            <div
              className={`content-topic ${showTopic ? "active" : undefined}`}
              ref={offCanvasRef}
            >
              <div className="content-topic-header">
                <h1>{contentData.about.name}</h1>
                <span>
                  <CloseIcon onClick={() => setShowTopic(false)} />
                </span>
              </div>
              <ul>
                {contentData.route!.map((content, index) => {
                  const isActive = content.topic === currentTopic;
                  const indentClass =
                    content.type === "H2"
                      ? "topic-h2"
                      : content.type === "H3"
                      ? "topic-h3"
                      : "topic-h1";
                  return (
                    <li
                      key={index}
                      ref={isActive ? activeTopicRef : null}
                      className={`topic-item ${indentClass}`}
                    >
                      {content.heading && (
                        <h3 className="topic-heading">{content.heading}</h3>
                      )}
                      {content.subHeading && (
                        <h3 className="topic-subheading">
                          <span>- </span>
                          {content.subHeading}
                        </h3>
                      )}
                      <NavLink
                        className={"my-nav-link"}
                        end
                        to={`/${category}/${contentData.about.name}/${content.topic}`}
                        onClick={() => {
                          setCurrentTopic(content.topic);
                          setShowTopic(false);
                          scrollToTop();
                        }}
                      >
                        {capitalizeFirstLetter(content.topic)}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Content Main */}
          <div className="content-main">
            <Outlet />
            <div className="navigation-buttons">
              <div
                className={`navigation-button ${
                  previousTopic ? "active" : undefined
                }`}
                onClick={() => handleNavigation(previousTopic)}
              >
                <ArrowBackIosIcon />
                <span>{t("tutorial.previous")}</span>
              </div>

              <div
                className={`navigation-button ${
                  nextTopic ? "active" : undefined
                }`}
                onClick={() => handleNavigation(nextTopic)}
              >
                <span>{t("tutorial.next")}</span>
                <ArrowForwardIosIcon />
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </Section>
    </>
  );
};

export default Tutorial;
