import { Helmet } from "react-helmet";
import Animated from "../../components/Animated/Animated";
import { useTranslation } from "react-i18next";
import { email } from "../../utils/message";

const PrivacyPolicy = () => {
  const { t } = useTranslation(); // assuming your keys are under "privacy" in the default namespace

  return (
    <>
      <Helmet>
        <title>{t("privacy.title")}</title>
        <meta name="description" content={t("privacy.description")} />
      </Helmet>
      <Animated>
        <h1>{t("privacy.heading")}</h1>
        <p>{t("privacy.intro")}</p>

        <h2>{t("privacy.sections.section1.title")}</h2>
        <p>{t("privacy.sections.section1.content")}</p>

        <h2>{t("privacy.sections.section2.title")}</h2>
        <p>{t("privacy.sections.section2.content")}</p>

        <h2>{t("privacy.sections.section3.title")}</h2>
        <p>{t("privacy.sections.section3.content")}</p>

        <h2>{t("privacy.sections.section4.title")}</h2>
        <p>{t("privacy.sections.section4.content")}</p>

        <h2>{t("privacy.sections.section5.title")}</h2>
        <p>
          {t("privacy.sections.section5.content")} <strong>{email}</strong>.
        </p>
      </Animated>
    </>
  );
};

export default PrivacyPolicy;
