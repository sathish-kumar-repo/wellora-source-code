import React from "react";
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
    <div className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 p-8 text-center" {...props}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <Lottie options={defaultOptions} height={150} width={150} />
        </div>
        <div className="flex-1">
          <h5 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
            {t("searchNotFound.heading")} "{searchTerm}"
          </h5>
          <p className="text-secondary-600 dark:text-secondary-300 mb-4">
            {t("searchNotFound.subheading")}
          </p>
          <ul className="text-left text-secondary-500 dark:text-secondary-400 space-y-2">
            <li>• {t("searchNotFound.ideas1")}</li>
            <li>• {t("searchNotFound.ideas2")}</li>
            <li>• {t("searchNotFound.ideas3")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoResultFound;