import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const EnumerationInJava = () => {
  return (
    <>
      <Title>Enumeration in Java</Title>
      <Para>
        va enums (declared using the enum keyword) are shorthand syntax for
        sizable quantities of constants of a single class. Enum can be
        considered to be syntax sugar for a sealed class that is instantiated
        only a number of times known at compile-time to define a set of
        constants. A simple enum to list the different seasons would be declared
        as follows:
      </Para>
      <Syntax title="Example" code={eg} />
      <Syntax
        src="91 Enumeration in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default EnumerationInJava;

const eg = `
public enum GameLevel
{
    LOW,
    MEDIUM,
    HIGH,
}
`;
