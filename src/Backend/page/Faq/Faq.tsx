import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Section from "../../components/Section";
import { useTranslation } from "react-i18next";

const Faq: React.FC = () => {
  const { t } = useTranslation();

  // Type assertion to let TypeScript know this is an array
  const faqs = t("faq.faqs", { returnObjects: true }) as {
    question: string;
    answer: string;
  }[];

  const [activeIndex, setActiveIndex] = useState<number>(0); // First open

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <Section className="min-h-screen bg-white dark:bg-secondary-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-secondary-900 dark:text-secondary-100 mb-12">
          {t("faq.title")}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className="bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-700 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-secondary-900 dark:text-secondary-100 pr-4">
                    {faq.question}
                  </span>
                  <span className="text-primary-600 dark:text-primary-400 flex-shrink-0">
                    {isActive ? <RemoveIcon /> : <AddIcon />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-4 text-secondary-600 dark:text-secondary-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Faq;