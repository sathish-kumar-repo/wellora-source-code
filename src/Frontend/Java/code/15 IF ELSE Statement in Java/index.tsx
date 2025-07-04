import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const IfElseStatementInJava = () => {
  return (
    <>
      <Title>IF ELSE Statement in Java</Title>
      <Para>
        The Java if-else statement also tests the condition.The condition is any
        expression that returns a boolean value. An if statement executes code
        conditionally depending on the result of the condition in parentheses.
        When condition in parentheses is true it will enter to the block of if
        statement which is defined by curly braces like open braces and close
        braces.
      </Para>
      <Para>
        Opening bracket till the closing bracket is the scope of the if
        statement. The else block is optional and can be omitted.It runs if the
        if statement is false and does not run if the if statement is true
        because in that case if statement executes.
      </Para>
      <Syntax title="Syntax" code={syntax} />
      <Syntax
        src="15 IF ELSE Statement in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default IfElseStatementInJava;

const syntax = `
if( condition )
{
  // body of the statement if condition is true ;
}
else
{
  // body of the statement if condition is false ;
}
`;
