import { Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const FactorialInJava = () => {
  return (
    <>
      <Title>Factorial in Java</Title>

      <Syntax
        src="26 Factorial in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default FactorialInJava;
