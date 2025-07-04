import { List, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const NestingOfMethodsInJava = () => {
  return (
    <>
      <Title>Nesting of Methods in Java</Title>
      <Para>
        Nesting methods means calling one method from inside another method.
      </Para>
      <List
        items={[
          "Java does NOT allow defining one method inside another (unlike Python or JavaScript).",
          "But it does allow calling a method from within another method.",
        ]}
      />
      <Space sT={20} />
      <Syntax
        src="68 Nesting of Methods in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default NestingOfMethodsInJava;
