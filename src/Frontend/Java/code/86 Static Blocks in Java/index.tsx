import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const StaticBlocksInJava = () => {
  return (
    <>
      <Title>Static Blocks in Java</Title>
      <Para>
        The static block is a set of instructions that is run only once when a
        class is loaded into memory. A static block is also called a static
        initialization block. This is because it is an option for initializing
        or setting up the class at run-time.
      </Para>
      <Syntax
        src="86 Static Blocks in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default StaticBlocksInJava;
