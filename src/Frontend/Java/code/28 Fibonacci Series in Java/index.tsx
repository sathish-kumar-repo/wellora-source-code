import { Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const FibonacciSeriesInJava = () => {
  return (
    <>
      <Title>Fibonacci Series in Java</Title>
      <Syntax
        src="28 Fibonacci Series in Java\App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default FibonacciSeriesInJava;
