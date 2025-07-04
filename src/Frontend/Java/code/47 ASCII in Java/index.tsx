import { Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const AsciiInJava = () => {
  return (
    <>
      <Title>ASCII in Java</Title>
      <Para>
        ASCII (American Standard Code for Information Interchange) is a
        character encoding standard that assigns a unique number (0 to 127) to
        each character (letters, digits, symbols, etc.).
      </Para>
      <Space sT={20} />
      <Syntax
        src="47 ASCII in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default AsciiInJava;
