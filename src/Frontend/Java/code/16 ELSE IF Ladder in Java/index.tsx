import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const ElseIfLadderInJava = () => {
  return (
    <>
      <Title>ELSE IF Ladder in Java</Title>
      <Para>
        Use if to specify a block of code to be executed, if a specified
        condition is true. Use else to specify a block of code to be executed,
        if the same condition is false. Use else if to specify a new condition
        to test, if the first condition is false.
      </Para>
      <Para>
        The else if condition is checked only if all the conditions before it
        (in previous else if constructs, and the parent if constructs) have been
        tested to false.
      </Para>
      <Syntax title="Syntax" code={syntax} />
      <Syntax
        src="16 ELSE IF Ladder in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default ElseIfLadderInJava;

const syntax = `
if ( condition 1 )
{
    // block of statement to be executed if condition is true ;
}
else if ( condition 2 )
{
    // block of statement to be executed if the condition1 is false condition2 is true ;
}
else
{
    block of statement to be executed if the condition1 is false condition2 is False ;
}
`;
