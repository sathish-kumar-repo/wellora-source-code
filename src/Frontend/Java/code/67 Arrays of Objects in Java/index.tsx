import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const ArraysOfObjectsInJava = () => {
  return (
    <>
      <Title>Arrays of Objects in Java</Title>
      <Para>
        An array is a collection of similar data elements stored at contiguous
        memory locations. It is the simplest data structure where each data
        element can be accessed directly by only using its index number. Java
        array is an object which contains elements of a similar data type.
        Additionally, The elements of an array are stored in a contiguous memory
        location.
      </Para>
      <Syntax title="Syntax" code={syntax} />
      <Syntax title="Example" code={eg} />
      <Syntax
        src="67 Arrays of Objects in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default ArraysOfObjectsInJava;

const syntax = `
Class_name object [ ] = new class_name ( ) ;
`;
const eg = `
Student s [ 5 ] = new Student ( ) ;
`;
