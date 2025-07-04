import { List, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const ConditionalOrTernaryOperatorsInJava = () => {
  return (
    <>
      <Title>Conditional or Ternary Operators in Java</Title>
      <Para>
        The conditional operator is also known as the ternary operator. This
        operator consists of three operands and is used to evaluate Boolean
        expressions. When using a Java ternary construct, only one of the
        right-hand side expressions, i.e. either expression1 or expression2, is
        evaluated at runtime.Condition? expression1: expression2;
      </Para>
      <List
        items={[
          "if condition is true, expression1 is executed.",
          "And, if condition is false, expression2 is executed.",
        ]}
      />
      <Space sT={20} />
      <Syntax
        src="10 Conditional or Ternary Operators in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default ConditionalOrTernaryOperatorsInJava;
