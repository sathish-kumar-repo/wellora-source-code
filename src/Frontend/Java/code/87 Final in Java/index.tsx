import { List, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const FinalInJava = () => {
  return (
    <>
      <Title>Final in Java</Title>
      <Para>
        Final in Java can refer to variables, methods and classes. The final
        keyword is used in several contexts to define an entity that can only be
        assigned once. Once a final variable has been assigned, it always
        contains the same value.
      </Para>
      <List
        items={[
          "Final variable cannot be reassigned",
          "Final method cannot be overridden",
          "Final class cannot be extended",
        ]}
      />
      <Syntax
        src="87 Final in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default FinalInJava;
