import { List, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const DoWhileLoopInJava = () => {
  return (
    <>
      <Title>do While Loop in Java</Title>
      <Para>
        The do-while loop always executes its body at least once, because its
        conditional expression is at the bottom of the loop.The do-while loop
        first executes the body of the loop and then evaluates the conditional
        expression. If this expression is true, the loop will repeat. Otherwise,
        the loop terminates.
      </Para>
      <List
        items={[
          "The first body of the loop is executed.",
          "The condition is checked, and if true, the body of the loop inside the do statement is executed again.",
          "The condition is checked again.",
          "This process continues until the condition is false.",
          "When the condition is false, the loop stops.",
        ]}
      />
      <Syntax title="Syntax" code={syntax} />
      <Syntax
        src="21 Do While Loop in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default DoWhileLoopInJava;

const syntax = `
do
{
    // body of loop;
    // Increment (or) Decrement;
}  while(Condition) ;
`;
