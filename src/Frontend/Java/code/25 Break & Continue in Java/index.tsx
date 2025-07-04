import { H1, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const BreakAndContinueInJava = () => {
  return (
    <>
      <Title>Break & Continue in Java</Title>
      <H1>Break</H1>
      <Para>
        By using break,you can force immediate termination of a loop, bypassing
        the conditional expression and any remaininh code in the body of the
        loop.When a break statement is encountered inside a loop, the loop is
        immediately terminated and the program control resumes at the next
        statement following the loop.
      </Para>
      <H1>Continue</H1>
      <Para>
        The continue statement performs such an action. In while and do-while
        loops, a continue statement causes control to be transferred directly to
        the conditional expression that controls the loop.
      </Para>
      <Space sT={20} />
      <Syntax
        src="25 Break & Continue in Java\App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default BreakAndContinueInJava;
