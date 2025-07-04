import { Helmet } from "react-helmet";
import Animated from "../../components/Animated/Animated";
import { Trans, useTranslation } from "react-i18next";
import { email } from "../../utils/message";

const TermsAndConditions = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("terms.title")}</title>
        <meta name="description" content={t("terms.description")} />
      </Helmet>
      <Animated>
        <h1>{t("terms.heading")}</h1>
        <p>
          <Trans i18nKey={"terms.intro"} />
        </p>

        <h2>{t("terms.sections.section1.title")}</h2>
        <p>{t("terms.sections.section1.content")}</p>

        <h2>{t("terms.sections.section2.title")}</h2>
        <p>{t("terms.sections.section2.intro")}</p>
        <ul>
          <li>{t("terms.sections.section2.content.item1")}</li>
          <li>{t("terms.sections.section2.content.item2")}</li>
          <li>{t("terms.sections.section2.content.item3")}</li>
        </ul>

        <h2>{t("terms.sections.section3.title")}</h2>
        <p>{t("terms.sections.section3.content")}</p>

        <h2>{t("terms.sections.section4.title")}</h2>
        <p>{t("terms.sections.section4.content")}</p>

        <h2>{t("terms.sections.section5.title")}</h2>
        <p>{t("terms.sections.section5.content")}</p>

        <h2>{t("terms.sections.section6.title")}</h2>
        <p>{t("terms.sections.section6.content")}</p>

        <h2>{t("terms.sections.section7.title")}</h2>
        <p>{t("terms.sections.section7.content")}</p>

        <h2>{t("terms.sections.section8.title")}</h2>

        <p>
          <Trans i18nKey={"terms.sections.section8.content"} />
        </p>

        <h2>{t("terms.sections.section9.title")}</h2>
        <p>
          {t("terms.sections.section9.content")} <strong>{email}</strong>.
        </p>
      </Animated>
    </>
  );
};

export default TermsAndConditions;
