import { HL, List, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const SwitchStatementInJava = () => {
  return (
    <>
      <Title>Switch Statement in Java</Title>
      <Para>
        The switch statement is Java's multi-way branch statement. It is used to
        take the place of long if-else chains, and make them more readable.
        However, unlike if statements, one may not use inequalities; each value
        must be concretely defined.
      </Para>
      <Para>There are three critical components to the switch statement:</Para>
      <List
        items={[
          <>
            <HL>Case:</HL> This is the value that is evaluated for equivalence
            with the argument to the switch statement.
          </>,
          <>
            <HL>Default:</HL> This is an optional, catch-all expression, should
            none of the case statements evaluate to true.
          </>,
          <>
            Abrupt completion of the case statement; usually <HL>break</HL>:
            This is required to prevent the undesired evaluation of further case
            statements
          </>,
        ]}
      />
      <Syntax title="Syntax" code={syntax} />
      <Syntax
        src="18 Switch Statement in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default SwitchStatementInJava;

const syntax = `
switch ( expression )
{
case 1 :
      // Block of Statement
      break;
case 2 :
      // Block of Statement
      break;
case 3 :
      // Block of Statement
      break;
case 4 :
      // Block of Statement
      break;
  .
  .
  default :
      // Block of Statement
      break;
}
`;
