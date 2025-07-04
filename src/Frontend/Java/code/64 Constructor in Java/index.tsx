import {
  H1,
  List,
  Media,
  Para,
  Space,
  Syntax,
  Title,
} from "../../../../Backend/UI";
import { domain } from "../../content";

const ConstructorInJava = () => {
  return (
    <>
      <Title>Constructor in Java</Title>
      <Para>
        Constructors are special methods named after the class and without a
        return type, and are used to construct objects. Constructors, like
        methods, can take input parameters. Constructors are used to initialize
        objects. Abstract classes can have constructors al
      </Para>
      <List
        items={[
          "Constructors can only take the modifiers public, private, and protected, and cannot be declared abstract, final, static, or synchronized.",
          "Constructors do not have a return type.",
          "Constructors MUST be named the same as the class name.",
        ]}
      />
      <H1>Types of constructor :</H1>
      <List
        items={[
          "Default constructor",
          "Parametrized constructor",
          "Copy constructor",
          "Constructor Overloading",
        ]}
      />
      <Media src="64 Constructor in Java/img.jpg" customDomain={domain} />
      <Space sT={20} />
      <Syntax
        src="64 Constructor in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default ConstructorInJava;
