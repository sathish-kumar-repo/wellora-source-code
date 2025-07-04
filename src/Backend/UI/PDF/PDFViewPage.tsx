// src/pages/PDFViewerPage.tsx

import { Worker, Viewer, LoadError } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useSearchParams } from "react-router-dom";
import NotFound from "../../page/NotFound/NotFound";
import styles from "./style.module.css";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const PDFViewerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const pdfFileParam = searchParams.get("file") || "";

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { t } = useTranslation();

  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  const fullPdfUrl =
    pdfFileParam.startsWith("/") && !pdfFileParam.startsWith("/wellora/")
      ? `/vwellora/pdf${pdfFileParam}`
      : pdfFileParam;

  const renderError = (error: LoadError) => {
    let message = "";
    switch (error.name) {
      case "InvalidPDFException":
        message = "The document is invalid or corrupted";
        break;
      case "MissingPDFException":
        message = "The document is missing";
        break;
      case "UnexpectedResponseException":
        message = "Unexpected server response";
        break;
      default:
        message = "Cannot load the document";
        break;
    }
    console.error(message);
    return <NotFound />;
  };
  if (fullPdfUrl === "") return <NotFound />;

  const handleSwitchTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <Helmet>
        <title>{t("pdf.title")}</title>
        <meta name="description" content={t("pdf.description")} />
      </Helmet>
      <div className={styles.pdf_viewer_page}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={fullPdfUrl}
            plugins={[defaultLayoutPluginInstance]}
            renderError={renderError}
            theme={theme}
            onSwitchTheme={handleSwitchTheme}
          />
        </Worker>
      </div>
    </>
  );
};

export default PDFViewerPage;
