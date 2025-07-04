import { Media, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const PerfectNumberInJava = () => {
  return (
    <>
      <Title>Perfect Number in Java</Title>
      <Media src="37 Perfect Number in Java/img.jpg" customDomain={domain} />
      <Syntax
        src="37 Perfect Number in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default PerfectNumberInJava;
