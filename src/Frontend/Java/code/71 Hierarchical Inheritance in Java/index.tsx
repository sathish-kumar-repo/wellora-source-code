import { Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const HierarchicalInheritanceInJava = () => {
  return (
    <>
      <Title>Hierarchical Inheritance in Java</Title>
      <Para>
        Hierarchical inheritance means one parent (base) class has multiple
        child (derived) classes.
      </Para>
      <Para>
        Each child class inherits the properties and methods of the parent
        class, but they can also have their own unique features.
      </Para>
      <Space sT={20} />
      <Syntax
        src="71 Hierarchical Inheritance in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default HierarchicalInheritanceInJava;
