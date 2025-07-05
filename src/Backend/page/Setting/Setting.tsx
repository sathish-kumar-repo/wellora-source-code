import { Helmet } from "react-helmet";
import { Header } from "../../components/Header/Header";
import Section from "../../components/Section";
import { Footer } from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import Switch from "../../components/Switch/Switch";
import { usePrivateTab } from "../../context/PrivateTabContext";
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
      <Section className="min-h-screen bg-white dark:bg-secondary-950 flex flex-col">
        <Header />
        <Container className="flex-1 py-8">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-secondary-900 dark:text-secondary-100">
                  {t("settings.privateTab")}
                </span>
                <Switch checked={isPrivate} onChange={togglePrivate} />
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </Section>
    </>
  );
};

export default Setting;