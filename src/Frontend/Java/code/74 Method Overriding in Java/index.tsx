import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const MethodOverridingInJava = () => {
  return (
    <>
      <Title>Method Overriding in Java</Title>
      <Para>
        Overriding in Inheritance is used when you use a already defined method
        from a super class in a sub class, but in a different way than how the
        method was originally designed in the super class. Overriding allows the
        user to reuse code by using existing material and modifying it to suit
        the user’s needs better.
      </Para>
      <Syntax
        src="74 Method Overriding in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default MethodOverridingInJava;
