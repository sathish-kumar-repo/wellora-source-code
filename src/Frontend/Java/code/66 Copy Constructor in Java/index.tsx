import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const CopyConstructorInJava = () => {
  return (
    <>
      <Title>Copy Constructor in Java</Title>
      <Para>
        A copy constructor is a constructor that creates a new object using an
        existing object of the same class and initializes each instance variable
        of newly created object with corresponding instance variables of the
        existing object passed as argument.
      </Para>
      <Syntax title="Syntax" code={syntax} />
      <Syntax title="Example" code={eg} />
      <Syntax
        src="66 Copy Constructor in Java/CopyConstructor.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default CopyConstructorInJava;

const syntax = `
public class_Name(const className old_object)
`;
const eg = `
Public student(student o)
`;
