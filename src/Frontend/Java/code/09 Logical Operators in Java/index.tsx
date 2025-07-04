import { Para, Syntax, Table, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const LogicalOperatorsInJava = () => {
  return (
    <>
      <Title>Logical Operators in Java</Title>
      <Para>
        A logical operator (sometimes called a "Boolean operator") in Java
        programming is an operator that returns a Boolean result that's based on
        the Boolean result of one or two other expressions. Sometimes,
        expressions that use logical operators are called "compound expressions"
        because the effect of the logical operators is to let you combine two or
        more condition tests into a single expression. Logical operators when we
        test more than one condition to make decisions. These are: && (meaning
        logical AND), || (meaning logical OR) and ! (meaning logical NOT).
      </Para>
      <Table>
        <thead>
          <tr>
            <th>Operator</th>
            <th>Example</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&&</td>
            <td>(Logical AND)</td>
            <td>
              expression1 && expression2 true only if both expression1 and
              expression2 are true
            </td>
          </tr>
          <tr>
            <td>||</td>
            <td>(Logical OR)</td>
            <td>
              expression1 || expression2 true if either expression1 or
              expression2 is true
            </td>
          </tr>
          <tr>
            <td>!</td>
            <td>(Logical NOT)</td>
            <td>!expression true if expression is false and vice versa</td>
          </tr>
        </tbody>
      </Table>
      <Syntax
        src="09 Logical Operators in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default LogicalOperatorsInJava;
