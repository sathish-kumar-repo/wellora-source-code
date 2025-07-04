import { List, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const ArithmeticOperatorsInJava = () => {
  return (
    <>
      <Title>Arithmetic Operators in Java</Title>
      <Para>
        The Java programming language supports various arithmetic operators for
        all floating-point and integer numbers. These operators are +
        (addition), - (subtraction), * (multiplication), / (division), and %
        (modulo).
      </Para>
      <List
        items={[
          <>
            <b>Addition(+):</b> This operator is a binary operator and is used
            to add two operands.
          </>,
          <>
            <b>Subtraction(-):</b> This operator is a binary operator and is
            used to subtract two operands.
          </>,
          <>
            <b>Multiplication(*):</b> This operator is a binary operator and is
            used to multiply two operands.
          </>,
          <>
            <b>Division(/):</b> This is a binary operator that is used to divide
            the first operand(dividend) by the second operand(divisor) and give
            the quotient as result.
          </>,
          <>
            <b>Modulus(%)</b>: This is a binary operator that is used to return
            the remainder when the first operand(dividend) is divided by the
            second operand(divisor).
          </>,
        ]}
      />
      <Space sT={20} />
      <Syntax
        src="06 Arithmetic Operators in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default ArithmeticOperatorsInJava;
