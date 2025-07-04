import { ContentDataType } from "../../../Backend/model/content_model";
import Intro from "../code/00 Intro";
import BasicProgramInJava from "../code/01 Basic Program in Java";
import CommandLineArgumentsInJava from "../code/02 Command Line Arguments in Java";
import SingleAndMultiLineCommentsInJava from "../code/03 Single and Multi Line Comments in Java";
import VariablesInJava from "../code/04 Variables in Java";
import TypeCastingInJava from "../code/05 Type Casting in Java";
import ArithmeticOperatorsInJava from "../code/06 Arithmetic Operators in Java";

export const domain = "https://sathish-kumar-repo.github.io/tut-java/";

const javaContent: ContentDataType = {
  about: {
    subCategory: "Programming Languages",
    name: "Learn Java",
    description:
      "Learn Java, a versatile and widely-used programming language for building applications across platforms.",
    img: "java.jpg",
  },
  route: [
    {
      topic: "Intro in Java",
      page: <Intro />,
    },
    {
      topic: "Basic Program in Java",
      page: <BasicProgramInJava />,
    },
    {
      topic: "Command Line Arguments in Java",
      page: <CommandLineArgumentsInJava />,
    },
    {
      topic: "Single and Multi Line Comments in Java",
      page: <SingleAndMultiLineCommentsInJava />,
    },
    {
      heading: "Variables",
      topic: "Variables in Java",
      page: <VariablesInJava />,
    },
    {
      topic: "Type Casting in Java",
      page: <TypeCastingInJava />,
    },
    {
      heading: "Operators",
      topic: "Arithmetic Operators in Java",
      page: <ArithmeticOperatorsInJava />,
    },
  ],
};

export default javaContent;
