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

      <Section className="min-h-screen bg-white dark:bg-secondary-950 flex items-center justify-center px-4 py-12">
        <Tilt tiltEnable={!isMobile}>
          <div className="bg-white dark:bg-secondary-900 rounded-2xl shadow-xl border border-secondary-200 dark:border-secondary-700 p-8 max-w-md mx-auto text-center">
            <img
              className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-primary-100 dark:border-primary-900"
              src="/wellora/web-images/profile.jpg"
              alt={t("author.alt")}
            />
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-3">
              {t("author.name")}
            </h2>
            <p className="text-secondary-600 dark:text-secondary-300 mb-6 leading-relaxed">
              {t("author.bio")}
            </p>
            <div className="mb-6">
              <SocialMedia />
            </div>
            <a
              href="https://wa.me/919566506832"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
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