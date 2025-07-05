import React from "react";
import { Link } from "react-router-dom";
import LanguagePicker from "../LanguagePicker/LanguagePicker";
import SocialMedia from "../../page/Home/Components/SocialMedia";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTranslation } from "react-i18next";
import { email, getYear } from "../../utils/message";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

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
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t("footer.about")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <SocialMedia />
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t("footer.links")}
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/privacy_policy", label: t("footer.privacy") },
                { to: "/terms_and_condition", label: t("footer.terms") },
                { to: "/author", label: t("footer.author") },
                { to: "/faq", label: t("footer.faq") },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200 no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://sathish-kumar-repo.github.io/Code-Pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200 no-underline"
                >
                  Code Pro Web
                </a>
              </li>
            </ul>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {t("footer.lang")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {languageNames[lang]}
                  </span>
                  <LanguagePicker
                    direction="up"
                    available={["en", "ta", "hi"]}
                    current={lang}
                    onChange={handleLanguageChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Theme
                </span>
                <ThemeToggle size="sm" />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Contact
            </h3>
            <address className="not-italic space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <a 
                  href={`mailto:${email}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 no-underline"
                >
                  {email}
                </a>
              </div>
              <div>
                <a 
                  href="tel:+919566506832"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 no-underline"
                >
                  +91-9566506832
                </a>
              </div>
              <div>{t("footer.contact")}</div>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 mt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("footer.courseCopyright", { year: getYear })}
          </p>
          <button 
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 btn btn-ghost btn-sm"
            aria-label="Back to top"
          >
            <KeyboardArrowUpIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* SEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Wellora",
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