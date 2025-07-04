import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const MultilevelInheritanceInJava = () => {
  return (
    <>
      <Title>Multilevel Inheritance in Java</Title>
      <Para>
        Inheritance in Java is a mechanism in which one object acquires all the
        properties and behaviors of a parent object. It is an important part of
        OOPs (Object Oriented programming system). When a class extends a class,
        which extends anther class then this is called multilevel inheritance.
      </Para>
      <Para>
        <b>Example :</b> class Son extends class Father and class Father extends
        class Grandfather then this type of inheritance is known as multilevel
        inheritance.
      </Para>
      <Syntax
        src="70 Multilevel Inheritance in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default MultilevelInheritanceInJava;
