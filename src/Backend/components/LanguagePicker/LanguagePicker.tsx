import React, { useEffect, useRef, useState } from "react";
import styles from "./LanguagePicker.module.scss";
import { flags } from "./assets/flags";

interface LanguagePickerProps {
  current?: string;
  available?: string[];
  direction?: "up" | "down" | "left" | "right";
  colDirection?: "up" | "down" | "left" | "right";
  rows?: number;
  onChange?: (lang: string) => void;
  onChangeEnd?: (lang: string) => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  current = "EN",
  available = [],
  direction = "down",
  colDirection = ["up", "down"].includes(direction) ? "right" : "down",
  rows,
  onChange = () => {},
  onChangeEnd = () => {},
}) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<string>(current);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguagePicker = () => {
    if (!pickerRef.current) return;
    const willOpen = !isOpen;
    pickerRef.current.classList.toggle("is--active", willOpen);
    pickerRef.current.dataset.active = willOpen.toString();
    setIsOpen(willOpen);
  };

  const closeLanguagePicker = () => {
    if (!pickerRef.current) return;
    pickerRef.current.classList.remove("is--active");
    pickerRef.current.dataset.active = "false";
    setIsOpen(false);
  };

  const handleChangeLanguage = (lang: string) => {
    onChange(lang);
    setLanguage(lang);
    closeLanguagePicker();
    setTimeout(() => {
      onChangeEnd(lang);
    }, 300);
  };

  const generateAvailableLanguages = () =>
    available
      .filter((lang) => lang !== current)
      .map((lang) => (
        <div
          key={`lang-selector-${lang}`}
          className={`language-picker__container ${styles.container}`}
          style={{
            zIndex: language === lang ? 2 : undefined,
          }}
        >
          <div
            className={`language-picker__language ${styles.language}`}
            onClick={() => handleChangeLanguage(lang)}
          >
            <img src={flags[lang].img} alt={lang} />
          </div>
        </div>
      ));

  const calculateStyle = () => {
    const rectangle = pickerRef.current?.getBoundingClientRect();
    const size: {
      width?: number;
      height?: number;
      maxHeight: string;
      maxWidth: string;
    } = {
      maxHeight: "",
      maxWidth: "",
    };

    if (["down", "up"].includes(direction)) {
      size.height =
        direction === "down"
          ? Math.floor(
              ((window.innerHeight - 20 - (rectangle?.top || 0)) / 30) * 30
            )
          : rectangle?.top || 0;

      size.maxHeight = `${rows ? rows * 30 : size.height}px`;

      size.width =
        (Math.ceil(
          (available.length - 1) / Math.floor((size?.height || 1) / 30)
        ) || 1) * 40;
    } else if (["left", "right"].includes(direction)) {
      size.width =
        direction === "left"
          ? Math.floor(
              ((window.innerWidth - 30 - (rectangle?.left || 0)) / 40) * 40
            )
          : (rectangle?.right ?? 40) - 40;

      size.maxWidth = `${rows ? rows * 40 : size.width}px`;

      size.height =
        (Math.ceil(
          (available.length - 1) / Math.floor((size?.width || 1) / 40)
        ) || 1) * 30;
    }

    setStyle({
      width: `${size.width}px`,
      maxWidth: size.maxWidth,
      height: `${size.height}px`,
      maxHeight: size.maxHeight,
    });
  };

  const handleResize = () => {
    calculateStyle();
    if (isOpen) {
      closeLanguagePicker();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      closeLanguagePicker();
    }
  };

  useEffect(() => {
    if (rows && typeof rows !== "number") {
      throw new Error(`'rows' prop must be a number`);
    }

    if (["down", "up"].includes(direction)) {
      if (!["left", "right"].includes(colDirection)) {
        throw new Error(`'colDirection' prop must be 'left' or 'right'`);
      }
    } else if (["left", "right"].includes(direction)) {
      if (!["down", "up"].includes(colDirection)) {
        throw new Error(`'colDirection' prop must be 'down' or 'up'`);
      }
    } else {
      throw new Error(
        `'direction' prop must be 'down', 'up', 'left' or 'right'`
      );
    }

    calculateStyle();
  }, [direction, colDirection, rows]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={pickerRef}
      className={`language-picker ${styles.picker}`}
      data-direction={direction}
      data-col-direction={colDirection}
      onClick={toggleLanguagePicker}
    >
      <div
        className={`language-picker__current ${styles.current} ${styles.language}`}
      >
        <img src={flags[current].img} alt={current} />
      </div>
      {available.length !== 0 && (
        <div
          className={`language-picker__selector ${styles.selector}`}
          style={style}
        >
          {generateAvailableLanguages()}
        </div>
      )}
    </div>
  );
};

export default LanguagePicker;
