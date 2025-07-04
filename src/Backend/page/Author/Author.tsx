import "./Author.css";
import { Helmet } from "react-helmet";
import Section from "../../components/Section";
import Tilt from "react-parallax-tilt";
import SocialMedia from "../Home/Components/SocialMedia";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Author = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("author.title")}</title>
        <meta name="description" content={t("author.description")} />
      </Helmet>

      <Section className="author-container">
        <Tilt tiltEnable={!isMobile}>
          <div className="card">
            <img
              className="profile"
              src="/wellora/web-images/profile.jpg"
              alt={t("author.alt")}
            />
            <h2>{t("author.name")}</h2>
            <p>{t("author.bio")}</p>
            <SocialMedia />
            <a
              href="https://wa.me/919566506832"
              className="btn"
              rel="noopener noreferrer"
            >
              {t("author.whatsapp")}
            </a>
          </div>
        </Tilt>
      </Section>
    </>
  );
};

export default Author;
