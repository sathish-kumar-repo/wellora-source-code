import { Link } from "react-router-dom";
import "./NotFound.css";
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
      <Section className="not-found-section">
        <Header />
        <div className="not-found-container">
          <p className="error-code">404</p>
          <h1 className="title">{t("notFound.heading")}</h1>
          <p className="subtitle">{t("notFound.subHeading")}</p>

          <Link to="/" className="action">
            {t("notFound.action")}
          </Link>
        </div>
        <Footer />
      </Section>
    </>
  );
};

export default NotFound;
