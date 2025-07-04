import { H1, List, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const MethodOverloadingInJava = () => {
  return (
    <>
      <Title>Method Overloading in Java</Title>
      <Para>
        Method overloading, also known as function overloading, is the ability
        of a class to have multiple methods with the same name, granted that
        they differ in either number or type of arguments. Compiler checks
        method signature for method overloading.
      </Para>
      <H1>Method signature consists of three things :</H1>
      <List
        items={["Method name", "Number of parameters", "Types of parameters"]}
      />
      <Syntax
        src="73 Method Overloading in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default MethodOverloadingInJava;
