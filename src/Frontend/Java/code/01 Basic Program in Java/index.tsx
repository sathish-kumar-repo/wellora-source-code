import { H1, H2, HL, Note, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const BasicProgramInJava = () => {
  return (
    <>
      <Title>Basic Program in Java</Title>
      <Para>Let's create the Hello World java Program.</Para>

      <H1>{`class basic {..}`}</H1>
      <Para>
        In Java, every program begins with a class definition. In the program,
        basic is the name of the class, and the class definition is:
      </Para>
      <Syntax code={code1} />

      <Note>
        For now, just remember that every Java program has a class definition,
        and the name of the class should match the file name in Java.
      </Note>

      <H1>{`public static void main(String[] args) { ... }`}</H1>
      <Para>
        This is the main method. Every program in Java must contain the main
        method. The Java compiler starts executing the code from the main
        method.For now, just remember that the main function is the entry point
        of your Java application, and it's mandatory in a Java program.The
        signature of the main method in Java is
      </Para>
      <Syntax code={code2} />

      <Para>
        This is a basic Java program that prints <HL>"Welcome Back"</HL> to the
        console. The <HL>public class basic</HL> declares a public class named
        <HL>basic</HL>. The <HL>public static void main(String args[])</HL> is
        the main method which is the entry point for the program. The
        <HL>System.out.println("Welcome Back");</HL> prints the string{" "}
        <HL>"Welcome Back"</HL> to the console. Overall, this program will print
        <HL>"Welcome Back"</HL> to the console when executed.
      </Para>
      <H2>Source Code</H2>
      <Syntax
        src="01 Basic Program in Java/basic.java"
        customDomain={domain}
        title="basic.java"
        language="java"
      />
    </>
  );
};

export default BasicProgramInJava;

const code1 = `
class basic 
  {
  	......
  	......
  }
`;
const code2 = `
public static void main(String[] args) 
  {
  	... 
  	.. 
  	...
  }
`;
