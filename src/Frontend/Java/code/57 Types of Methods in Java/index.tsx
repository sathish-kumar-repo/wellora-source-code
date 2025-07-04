import {
  H1,
  HL,
  List,
  Media,
  Para,
  Space,
  Syntax,
  Title,
} from "../../../../Backend/UI";
import { domain } from "../../content";

const TypesOfMethodsInJava = () => {
  return (
    <>
      <Title>Types of Methods in Java</Title>
      <Para>
        A Java method is a collection of statements that are grouped together to
        perform an operation. A method in Java is a block of code that, when
        called, performs specific actions mentioned in it. For instance, if you
        have written instructions to draw a circle in the method, it will do
        that task.
      </Para>
      <Para>
        You can insert values or parameters into methods, and they will only be
        executed when called. They are also referred to as functions. The
        primary uses of methods in Java are:
      </Para>
      <List
        items={[
          "It allows code re-usability (define once and use multiple times)",
          "You can break a complex program into smaller chunks of code",
          "It increases code readability",
        ]}
      />
      <Media
        sequence={{
          start: 1,
          end: 2,
          base: "57 Types of Methods in Java/img/",
          ext: "jpg",
        }}
        customDomain={domain}
      />
      <H1>Two Types of Methods :</H1>
      <List
        type="ordered"
        items={[
          <>
            <HL>User-defined Methods</HL> : We can create our own method based
            on our requirements.
          </>,
          <>
            <HL>Standard Library Methods</HL> : These are built-in methods in
            Java that are available to use.
          </>,
        ]}
      />
      <H1>Syntax:</H1>
      <Syntax title="Syntax" code={syntax} />
      <H1>Access specifier :</H1>
      <List
        items={[
          <>
            <HL>Public:</HL> You can access it from any class
          </>,
          <>
            <HL>Private:</HL> You can access it within the class where it is
            defined
          </>,
          <>
            <HL>Protected:</HL> Accessible only in the same package or other
            subclasses in another package
          </>,
        ]}
      />
      <H1>Return type :</H1>{" "}
      <List
        items={[
          <>
            <HL>Int:</HL> Int as the return type if the method returns value."
          </>,
          <>
            <HL>Void:</HL> Void as the return type if the method returns no
            value."
          </>,
        ]}
      />
      <H1>Parameter list :</H1>
      <List
        items={[
          "It is a list of arguments (data_type variable_name) that will be used in the method.",
        ]}
      />
      <H1>Method body :</H1>
      <List
        items={[
          "This is the set of instructions enclosed within curly brackets.",
        ]}
      />
      <Space sT={20} />
      <Syntax
        src="57 Types of Methods in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default TypesOfMethodsInJava;

const syntax = `
Access_specifier Return_type Method_name ( Parameter list )
{
    // body of method ;
}
`;
