import { H1, List, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const StaticMemberFunctionInJava = () => {
  return (
    <>
      <Title>Static Member Function in Java</Title>
      <H1>Static Member</H1>
      <List
        items={[
          "A static member function belongs to the class itself, not to any specific object (instance) of the class.",
          "You can call a static function without creating an object of the class.",
          "Static functions cannot access non-static members (variables or functions) directly because they do not belong to any instance.",
        ]}
      />
      <Syntax
        src="59 Static Member Function in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default StaticMemberFunctionInJava;
