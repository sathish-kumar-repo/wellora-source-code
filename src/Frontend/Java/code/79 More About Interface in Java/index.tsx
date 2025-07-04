import { H1, Media, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const MoreAboutInterfaceInJava = () => {
  return (
    <>
      <Title>More About Interface in Java</Title>
      <H1>Look at this</H1>
      <Media
        sequence={{
          start: 1,
          end: 4,
          base: "79 More About Interface in Java/img/",
          ext: "jpg",
        }}
        customDomain={domain}
      />
      <H1>Working Code</H1>
      <Syntax
        src="79 More About Interface in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default MoreAboutInterfaceInJava;
