import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const MethodWithVarargsInJava = () => {
  return (
    <>
      <Title>Method With varargs in Java</Title>
      <Para>
        Varargs (variable-length arguments) allow a method to accept zero or
        more arguments of the same type as parameters.
      </Para>
      <Para>
        It makes method calls flexible without needing to overload methods for
        different numbers of parameters.
      </Para>
      <Syntax
        src="72 Method With varargs in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default MethodWithVarargsInJava;
