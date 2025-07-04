import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const IfStatementInJava = () => {
  return (
    <>
      <Title>IF Statement in Java</Title>
      <Para>
        The if statement is Java's conditional branch statement. It can be used
        to route program execution through two different paths. The if statement
        is the most basic of all the control flow statements. It tells your
        program to execute a certain section of code only if a particular test
        evaluates to true. The if statement is written with the if keyword,
        followed by a condition in parentheses, with the code to be executed in
        between curly brackets.
      </Para>
      <Syntax title="Syntax" code={syntax} />
      <Syntax
        src="14 IF Statement in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default IfStatementInJava;

const syntax = `
  if( condition )
  {
    // body of the statements;
  }
`;
