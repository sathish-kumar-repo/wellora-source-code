import { Media, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const FactorOfTheGivenNumberInJava = () => {
  return (
    <>
      <Title>Factor of the given number in Java</Title>
      <Media
        src="34 Factor of the given number in Java/img.jpg"
        customDomain={domain}
      />
      <Syntax
        src="34 Factor of the given number in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default FactorOfTheGivenNumberInJava;
