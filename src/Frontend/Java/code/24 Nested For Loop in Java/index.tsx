import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const NestedForLoopInJava = () => {
  return (
    <>
      <Title>Nested For Loop in Java</Title>
      <Para>
        A nested for loop is a for loop inside another for loop. The inner loop
        runs completely for each iteration of the outer loop.
      </Para>
      <Syntax
        src="24 Nested For Loop in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default NestedForLoopInJava;
