import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "../../components/Header/Header";
import Section from "../../components/Section";
import { Footer } from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("notFound.title")}</title>
        <meta name="description" content={t("notFound.description")} />
      </Helmet>
      <Section className="min-h-screen bg-white dark:bg-secondary-950 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="inline-block px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-semibold mb-4">
              404
            </div>
            <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
              {t("notFound.heading")}
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8">
              {t("notFound.subHeading")}
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              {t("notFound.action")}
            </Link>
          </div>
        </div>
        <Footer />
      </Section>
    </>
  );
};

export default NotFound;