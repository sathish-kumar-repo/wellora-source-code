import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const StaticInnerClassInJava = () => {
  return (
    <>
      <Title>Static Inner Class in Java</Title>
      <Para>
        The static keyword is used on a class, method, or field to make them
        work independently of any instance of the class.Static fields are common
        to all instances of a class. They do not need an instance to access
        them.
      </Para>
      <Syntax
        src="84 Static Inner Class in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default StaticInnerClassInJava;
