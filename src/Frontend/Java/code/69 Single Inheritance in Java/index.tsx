import { H1, List, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const SingleInheritanceInJava = () => {
  return (
    <>
      <Title>Single Inheritance in Java</Title>
      <Para>
        Inheritance in Java is a mechanism in which one object acquires all the
        properties and behaviors of a parent object. Inheritance is a basic
        object oriented feature in which one class acquires and extends upon the
        properties of another class, using the keyword extends.
      </Para>
      <Para>
        With the use of the extends keyword among classes, all the properties of
        the superclass (also known as the Parent Class or Base Class) are
        present in the subclass (also known as the Child Class or Derived Class)
      </Para>
      <List
        items={[
          "Single Inheritance",
          "Multilevel Inheritance",
          "Hierarchical Inheritance",
        ]}
      />
      <H1>Single Inheritance</H1>
      <Para>
        Single inheritance is one base class and one derived class. One in which
        the derived class inherits the one base class either publicly, privately
        or protected
      </Para>
      <Syntax title="Syntax" code={syntax} />
      <Syntax
        src="69 Single Inheritance in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default SingleInheritanceInJava;

const syntax = `
class baseclass_Name
{
  superclass data variables;
  superclass member functions;
}
class derivedclass_Name extends baseclass_Name
{
  subclass data variables;
  subclass member functions;
}
`;
