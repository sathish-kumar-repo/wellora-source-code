import EN from "./EN.png";
import TA from "./TA.png";
import HI from "./HI.png";

// Define the structure for each language flag object
export const flags: Record<string, { name: string; img: string }> = {
  en: {
    name: "en",
    img: EN,
  },
  ta: {
    name: "ta",
    img: TA,
  },
  hi: {
    name: "hi",
    img: HI,
  },
};
