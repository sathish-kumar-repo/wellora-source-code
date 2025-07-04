import { JSX } from "react";

export type TopicType = "H1" | "H2" | "H3";

export type ContentDataType = {
  about: {
    subCategory?: string;
    name: string;
    description: string;
    img: string;
    link?: string;
  };
  route?: {
    heading?: string;
    subHeading?: string;
    topic: string;
    type?: TopicType;
    page: JSX.Element;
  }[];
};
