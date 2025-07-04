import { List, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const ForLoopInJava = () => {
  return (
    <>
      <Title>For Loop in Java</Title>
      <Para>
        {`The for loop in Java is an entry-controlled loop. A for loop is a
        repetition control structure which allows us to write a loop that is
        executed a specific number of times. The three components of the for
        loop (separated by ;) are variable declaration/initialization (here int
        i = 0), the condition (here i < 100), and the increment statement
        (here i++).`}
      </Para>
      <List items={forLoopFlow} />
      <Para>
        The curly braces are optional (you can one line with a semicolon) if the
        loop contains just one statement. But, it's always recommended to use
        braces to avoid misunderstandings and bugs. The for loop components are
        optional. If your business logic contains one of these parts, you can
        omit the corresponding component from your for loop.
      </Para>
      <Space sT={20} />
      <Syntax
        src="22 For Loop in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default ForLoopInJava;

const forLoopFlow = [
  "The variable is initialized once at the beginning.",
  "The condition is checked before each iteration.",
  "If the condition is true, the loop body runs.",
  "After the body, the increment statement runs.",
  "Then the condition is checked again.",
  "When the condition is false, the loop stops.",
];
