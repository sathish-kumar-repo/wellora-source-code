import { List, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const WhileLoopInJava = () => {
  return (
    <>
      <Title>While Loop in Java</Title>
      <Para>
        The while loop is Java's most fundamental loop statement. It repeats a
        statement or block while its controlling expression is true.The
        condition can be any Boolean expression. The body of the loop will be
        executed as long as the conditional expression is true. When condition
        becomes false, control passes to the next line of code immediately
        following the loop.
      </Para>
      <List
        items={[
          "If the condition is true, the code inside the while loop is executed.",
          "The condition is evaluated again.",
          "This process continues until the condition is false.",
          "When the condition is false, the loop stops.",
        ]}
      />
      <Syntax title="Syntax" code={syntax} />
      <Syntax
        src="20 While Loop in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default WhileLoopInJava;

const syntax = `
while (Condition)
{
    // body of loop;
    // Increment (or) Decrement;
}
`;
