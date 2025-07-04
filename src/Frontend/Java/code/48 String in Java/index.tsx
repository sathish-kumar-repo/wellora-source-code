import { Media, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const StringInJava = () => {
  return (
    <>
      <Title>String in Java</Title>
      <Para>
        In Java, a string is an object that represents a sequence of characters.
        It is a fundamental data type used for storing text. Strings are
        immutable, meaning their value cannot be changed after creation. Any
        modification to a string results in a new string object.{" "}
      </Para>
      <Media
        sequence={{
          start: 1,
          end: 3,
          base: "48 String in Java/img/",
          ext: "jpg",
        }}
        customDomain={domain}
      />
      <Syntax
        src="48 String in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default StringInJava;
