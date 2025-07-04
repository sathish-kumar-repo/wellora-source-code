import { Media, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const StrongNumberInJava = () => {
  return (
    <>
      <Title>Strong Number in Java</Title>
      <Media src="38 Strong Number in Java/img.jpg" customDomain={domain} />
      <Syntax
        src="38 Strong Number in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default StrongNumberInJava;
