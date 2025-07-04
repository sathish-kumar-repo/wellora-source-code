import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const FinalMethodsInJava = () => {
  return (
    <>
      <Title>Final Methods in Java</Title>
      <Para>
        We can declare a method as final, once you declare a method final it
        cannot be overridden. So, you cannot modify a final method from a sub
        class. The main intention of making a method final would be that the
        content of the method should not be changed by any outsider.
      </Para>
      <Syntax
        src="88 Final Methods in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default FinalMethodsInJava;
