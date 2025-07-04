import { H1, H2, HL, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const ParametrizedConstructorAndConstructorOverloadingInJava = () => {
  return (
    <>
      <Title>Parametrized Constructor & Constructor Overloading in Java</Title>
      <H1>Parameterized constructors</H1>
      <Para>
        The parameterized constructors are the constructors having a specific
        number of arguments to be passed. The purpose of a parameterized
        constructor is to assign user-wanted specific values to the instance
        variables of different objects.
      </Para>
      <H2>Example :</H2>
      <Para>
        When we create the object like this{" "}
        <HL>Student s = new Student ( “Joes” , 15 )</HL> then the new keyword
        invokes the Parameterized constructor with int and string parameters
        <HL>public Student( String n , String a )</HL> after object creation.
      </Para>
      <H1>Constructor overloading</H1>
      <Para>
        Constructors are special methods named after the class and without a
        return type, and are used to construct objects. Constructors, like
        methods, can take input parameters. Constructors are used to initialize
        objects. Constructor overloading in Java means to more than one
        constructor in an instance class.
      </Para>
      <Space sT={20} />
      <Syntax
        src="65 Parametrized Constructor & Constructor Overloading in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default ParametrizedConstructorAndConstructorOverloadingInJava;
