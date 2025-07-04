import React from "react";
import "./NoResultFound.css";
import Lottie from "react-lottie";
import animationData from "../../assets/json/no-result-found.json";
import { useTranslation } from "react-i18next";

interface NoResultFoundProps extends React.HTMLAttributes<HTMLDivElement> {
  searchTerm: string;
}

const NoResultFound: React.FC<NoResultFoundProps> = ({
  searchTerm,
  ...props
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { t } = useTranslation();

  return (
    <div className="no-courses-message" {...props}>
      <div className="message-lottie">
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>
      <div className="message">
        <h5>
          {t("searchNotFound.heading")} "{searchTerm}"
        </h5>
        <p>{t("searchNotFound.subheading")}</p>
        <ul>
          <li>{t("searchNotFound.ideas1")}</li>
          <li>{t("searchNotFound.ideas2")}</li>
          <li>{t("searchNotFound.ideas3")}</li>
        </ul>
      </div>
    </div>
  );
};

export default NoResultFound;
