import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";
import LanguagePicker from "../LanguagePicker/LanguagePicker";
import SocialMedia from "../../page/Home/Components/SocialMedia";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTranslation } from "react-i18next";
import { email, getYear } from "../../utils/message";

const languageNames: Record<string, string> = {
  en: "English",
  ta: "தமிழ்",
  hi: "हिन्दी",
};

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <footer className="footer-glass">
      <div className="footer-container">
        {/* About */}
        <div className="footer-section">
          <h3>{t("footer.about")}</h3>
          <p>{t("footer.description")}</p>
          {/* Social Media Icons */}
          <SocialMedia />
        </div>

        {/* Links */}
        <div className="footer-section">
          <h3>{t("footer.links")}</h3>
          <ul>
            <li>
              <Link to="/privacy_policy" aria-label="Privacy Policy">
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link to="/terms_and_condition" aria-label="Terms and Conditions">
                {t("footer.terms")}
              </Link>
            </li>
            <li>
              <Link to="/author" aria-label="About Us">
                {t("footer.author")}
              </Link>
            </li>
            <li>
              <Link to="/faq" aria-label="Frequently Asked Questions">
                {t("footer.faq")}
              </Link>
            </li>
            <li>
              <a
                aria-label="Old learning materials"
                target="_blank"
                rel="noopener noreferrer"
                href="https://sathish-kumar-repo.github.io/Code-Pro/"
              >
                Code Pro Web
              </a>
            </li>
          </ul>
        </div>

        {/* Language Section */}
        <div className="footer-section">
          <h3>{t("footer.lang")}</h3>
          <div className="language-selector">
            <p>{languageNames[lang]}</p>
            <LanguagePicker
              direction="up"
              available={["en", "ta", "hi"]}
              current={lang}
              onChange={handleLanguageChange}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact</h3>
          <address>
            <a href={`mailto:${email}`}>{email}</a>
            <br />
            <a href="tel:+919566506832">+91-9566506832</a>
            <br /> {t("footer.contact")}
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <p> {t("footer.courseCopyright", { year: getYear })}</p>
        <span className="toggle-button back-to-top" aria-label="Back to top">
          <KeyboardArrowUpIcon onClick={scrollToTop} />
        </span>
      </div>

      {/* SEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Study",
          url: "https://sathish-kumar-repo.github.io/wellora/",
          contactPoint: {
            "@type": "ContactPoint",
            email: email,
            telephone: "+91-9566506832",
            contactType: "Customer Service",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Chennai",
            addressRegion: "TN",
            addressCountry: "IN",
          },
        })}
      </script>
    </footer>
  );
};
