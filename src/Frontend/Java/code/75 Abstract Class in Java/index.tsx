import { List, Media, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const AbstractClassInJava = () => {
  return (
    <>
      <Title>Abstract Class in Java</Title>
      <Para>
        An abstract class is a class marked with the abstract keyword. It,
        contrary to non-abstract class, may contain abstract -
        implementation-less - methods(An abstract class may contain abstract
        methods (methods without code or body)). It is, however, valid to create
        an abstract class without abstract methods.
      </Para>
      <Para>
        An abstract class cannot be instantiated. It can be sub-classed
        (extended) as long as the sub-class is either also abstract, or
        implements all methods marked as abstract by super classes.
      </Para>
      <Para>
        Abstraction can be achieved with either abstract classes or interfaces .
      </Para>
      <List
        items={[
          "Abstract class must have one abstract method.",
          "We can’ts create object using abstract class.",
          "Abstract class can have abstract and non abstract methods.",
        ]}
      />
      <Media src="75 Abstract Class in Java/img.jpg" customDomain={domain} />
      <Syntax
        src="75 Abstract Class in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default AbstractClassInJava;
