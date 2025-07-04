import "./Home.css";
import SocialMedia from "./Components/SocialMedia";
import { Header } from "../../components/Header/Header";
import Section from "../../components/Section";
import { Link } from "react-router-dom";
import { Character } from "./Components/Character";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { getYear } from "../../utils/message";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("home.title")}</title>
        <meta name="description" content={t("home.description")} />
      </Helmet>
      <Section className="home-section">
        <div className="container">
          <Header isHomePage={true} />
          <div className="content">
            <h2>{t("home.heading")}</h2>
            <p>{t("home.about")}</p>
            <Link to={"/author"}>{t("home.designedBy")}</Link>
          </div>
          <Character />
          <SocialMedia />
          <p className="copyrightText">
            {t("footer.copyright", { year: getYear })}
          </p>
        </div>
      </Section>
    </>
  );
};

export default Home;
