import { Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const CommandLineArgumentsInJava = () => {
  return (
    <>
      <Title>Command Line Arguments in Java</Title>
      <Para>
        A command-line argument is nothing but the information that we pass
        after typing the name of the Java program during the program execution.
        The command requires no arguments. The code illustrates that args length
        gives us the number of command line arguments. If we neglected to check
        args length, the command would crash if the user ran it with too few
        command-line arguments.
      </Para>
      <Para>
        A command-line argument is information that directly follows the
        program's name on the command line when it is executed. To access the
        command-line arguments inside a Java program is quite easy. They are
        stored as strings in the String array passed to main ( ).
      </Para>
      <Space sT={20} />
      <Syntax
        src="02 Command Line Arguments in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default CommandLineArgumentsInJava;
