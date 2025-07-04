import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const NestedIfInJava = () => {
  return (
    <>
      <Title>Nested If in Java</Title>
      <Para>
        A nested if is an if statement that is the target of another if or else.
        Nested ifs are very common in programming. when you nest ifs, the main
        thing to remember is that an else statement always refers to the nearest
        if statement that is within the same block as the else and that is not
        already associated with an else.
      </Para>
      <Syntax title="Syntax" code={syntax} />
      <Syntax
        src="17 Nested If in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default NestedIfInJava;

const syntax = `
if (Expression 1)
{
    // Executes when the Expression 1 is true
     if (Expression 2)
     {
        // Executes when the Expression 2 is true
     }
}
`;
