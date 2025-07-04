import { Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const GroupSwitchStatementInJava = () => {
  return (
    <>
      <Title>Group Switch Statement in Java</Title>
      <Para>
        Grouped switch cases allow multiple case labels to execute the same
        block of code in a switch statement.
      </Para>
      <Para>
        This is useful when multiple input values require the same response — no
        need to repeat code.
      </Para>
      <Space sT={20} />
      <Syntax
        src="19 Group Switch Statement in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default GroupSwitchStatementInJava;
