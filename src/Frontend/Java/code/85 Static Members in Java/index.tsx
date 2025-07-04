import { H1, List, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const StaticMembersInJava = () => {
  return (
    <>
      <Title>Static Members in Java</Title>
      <Para>
        Static members are class-level members — meaning they belong to the
        class itself, not to any specific object (instance) of the class. There
        are two types of static members:
      </Para>
      <H1>1. Static Variables (Class Variables)</H1>
      <List items={staticVariableInfo} />
      <H1>2. Static Methods (Class Methods)</H1>
      <List items={staticMethodDetails} />
      <Space sT={20} />
      <Syntax
        src="85 Static Members in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default StaticMembersInJava;

const staticVariableInfo = [
  "A static variable belongs to the class and is shared by all objects of that class.",
  "It is initialized only once, when the class is first loaded into memory.",
  "If one object changes the value of a static variable, all other objects see that updated value, since there is only one shared copy.",
  "Static variables are useful for data that should be common to all instances, like a company name, or a counter to track how many objects were created.",
];

const staticMethodDetails = [
  "A static method belongs to the class rather than to any object.",
  "It can be called without creating an object by using the class name.",
  "Static methods can only access static variables and call other static methods.",
  "They cannot access instance (non-static) variables or methods directly, because instance members belong to objects, not the class.",
  "Static methods are often used for utility or helper functions that don’t depend on object data.",
];
