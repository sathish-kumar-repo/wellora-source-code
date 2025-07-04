import { List, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const SingleAndMultiLineCommentsInJava = () => {
  return (
    <>
      <Title>Single and Multi Line Comments in Java</Title>
      <Para>
        The comments are the statements that are not executed by the compiler
        and interpreter. It can be used to provide information or explanation
        about the variable, method, class or any statement. It can also be used
        to hide program code for a specific time.
      </Para>
      <List
        type="ordered"
        items={[
          "Single Line comments are started by // and may be positioned after a statement on the same line, but not before.",
          "Multi-Line comments are defined between /* and */. They can span multiple lines and may even been positioned between statements.",
        ]}
      />
      <Space sT={20} />
      <Syntax
        src="03 Single and Multi Line Comments in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default SingleAndMultiLineCommentsInJava;
