import React, { useState } from "react";
import "./Faq.css";
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
    <Section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">{t("faq.title")}</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className={`faq-item ${isActive ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-header">
                  <div className="faq-question">{faq.question}</div>
                  <div className="faq-icon">
                    {isActive ? <RemoveIcon /> : <AddIcon />}
                  </div>
                </div>
                <div
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: isActive ? "200px" : "0",
                    overflow: "hidden",
                  }}
                >
                  <div className="faq-answer">{faq.answer}</div>
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
