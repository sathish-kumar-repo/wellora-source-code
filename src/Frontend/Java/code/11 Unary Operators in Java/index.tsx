import { H1, List, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const UnaryOperatorsInJava = () => {
  return (
    <>
      <Title>Unary Operators in Java</Title>
      <Para>
        Unary Operators can be simply defined as an operator that takes only one
        operand and does a plain simple job of either incrementing or
        decrementing the value by one. Added, Unary operators also perform
        Negating operations for expression, and the value of the boolean can be
        inverted.
      </Para>
      <List
        items={[
          "Unary Plus, denoted by '+'",
          "Unary Minus, denoted by '-'",
          "Unary Increment Operator, denoted by '++'",
        ]}
      />
      <H1>Post-Increment</H1>
      <Para>
        Value is first processed then incremented. In post increment, whatever
        the value is, it is first used for computing purpose, and after that,
        the value is incremented by one.
      </Para>
      <H1>Pre-Increment</H1>
      <Para>
        On the contrary, Pre-increment does the increment first, then the
        computing operations are executed on the incremented value.
      </Para>
      <H1>Post-Decrement</H1>
      <Para>
        While using the decrement operator in post form, the value is first used
        then updated.
      </Para>
      <H1>Pre-Decrement</H1>
      <Para>
        With prefix form, the value is first decremented and then used for any
        computing operations.
      </Para>
      <Space sT={20} />
      <Syntax
        src="11 Unary Operators in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default UnaryOperatorsInJava;
