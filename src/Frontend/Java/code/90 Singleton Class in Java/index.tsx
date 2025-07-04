import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const SingletonClassInJava = () => {
  return (
    <>
      <Title>Singleton Class in Java</Title>
      <Para>
        A Singleton class allows only one object (instance) to be created for
        that class throughout the entire program.
      </Para>
      <Para>
        It’s useful when exactly one instance is needed to coordinate actions
        across the system — like Database connection, Logger, Config Manager,
        etc.
      </Para>
      <Syntax
        src="90 Singleton Class in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default SingletonClassInJava;
