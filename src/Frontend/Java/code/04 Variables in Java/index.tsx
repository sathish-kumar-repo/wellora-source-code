import { List, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const VariablesInJava = () => {
  return (
    <>
      <Title>Variables in Java</Title>
      <Para>
        A variable in simple terms is a storage place which has some memory
        allocated to it. Basically, a variable used to store some form of data.
        Different types of variables require different amounts of memory, and
        have some specific set of operations which can be applied on them.
      </Para>
      <Syntax
        title="Syntax"
        code={`Datatype variable_name = variable_value;`}
      />
      <List
        items={[
          "Variable name don’t start variable name with digits.",
          "Beginning with underscore is valid but not recommended.",
          "Special character not allowed in the name of variable.",
          "Blank or White spaces are not allowed.",
          "Don’t use keywords to name of you variable.",
        ]}
      />
      <Space sT={20} />
      <Syntax
        src="04 Variables in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default VariablesInJava;
