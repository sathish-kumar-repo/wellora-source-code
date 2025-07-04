import { Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const NumberIsPrimeOrNotInJava = () => {
  return (
    <>
      <Title>Number is prime or not in Java</Title>
      <Syntax
        src="35 Number is prime or not in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default NumberIsPrimeOrNotInJava;
