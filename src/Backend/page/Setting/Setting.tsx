import { Helmet } from "react-helmet";
import { Header } from "../../components/Header/Header";
import Section from "../../components/Section";
import { Footer } from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import Switch from "../../components/Switch/Switch";
import { usePrivateTab } from "../../context/PrivateTabContext";
import "./Setting.css";
import Container from "../../components/Container";

const Setting = () => {
  const { t } = useTranslation();
  const { isPrivate, togglePrivate } = usePrivateTab();

  return (
    <>
      <Helmet>
        <title>{t("settings.title")}</title>
        <meta name="description" content={t("settings.description")} />
      </Helmet>
      <Section className="setting-section">
        <Header />
        <Container className="setting-container">
          <div className="setting-content">
            <div className="setting-item">
              <span>{t("settings.privateTab")}</span>
              <Switch checked={isPrivate} onChange={togglePrivate} />
            </div>
          </div>
        </Container>
        <Footer />
      </Section>
    </>
  );
};

export default Setting;
