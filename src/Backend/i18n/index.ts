import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // load translations via HTTP
  .use(LanguageDetector) // auto-detects user's language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ta", "hi"],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/wellora/locales/{{lng}}/translation.json", // translation path
    },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
