import { HL, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const ScannerClassInJava = () => {
  return (
    <>
      <Title>Scanner Class in Java</Title>
      <Para>
        The following is how to properly use the <HL>java.util.Scanner</HL>{" "}
        class to interactively read user input from System.in correctly(
        sometimes referred to as stdin, especially in C, C++ and other languages
        as well as in Unix and Linux). It idiomatically demonstrates the most
        common things that are requested to be done.
      </Para>
      <Para>
        The Scanner class is used to read Java user input. Scanner is part of
        the java.util package, so it can be imported without downloading any
        external libraries. Scanner reads text from standard input and returns
        it to a program. Once the Scanner class is imported into the Java
        program, you can use it to read the input of various data types.
        Depending on whether you want to read the input from standard input and
        output
      </Para>
      <Space sT={20} />
      <Syntax
        src="13 Scanner Class in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default ScannerClassInJava;
