import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const LocalInnerClassInJava = () => {
  return (
    <>
      <Title>Local Inner Class in Java</Title>
      <Para>
        A class is a non-primitive or user-defined data type in Java, while an
        object is an instance of a class. Local classes are classes that are
        defined in a block, which is a group of zero or more statements between
        balanced braces. You typically find local classes defined in the body of
        a method.
      </Para>
      <Para>
        This section covers the following topics: Declaring Local Classes.
        Accessing Members of an Enclosing Class. A class i.e. created inside a
        method is called local inner class in java. If you want to invoke the
        methods of local inner class, you must instantiate this class inside the
        method.
      </Para>
      <Syntax title="Syntax" code={syntax} />
      <Syntax
        src="82 Local Inner Class in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default LocalInnerClassInJava;

const syntax = `
class Class_Name   // OuterClass
{
  void method ( )
  {
      class Class_Name  // NestedClass
      {
        . . .
      }
  }
}
`;
