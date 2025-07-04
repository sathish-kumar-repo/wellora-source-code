import { HL, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const TwoDimensionArraysInJava = () => {
  return (
    <>
      <Title>Two Dimension Arrays in Java</Title>
      <Para>
        The Java Program is 2D array is organized as matrices which can be
        represented as the collection of rows and column. It is possible to
        define an array with more than one dimension. Instead of being accessed
        by providing a single index, a multidimensional array is accessed by
        specifying an index for each dimension.
      </Para>
      <Para>
        The declaration of multidimensional array can be done by adding{" "}
        <HL>[]</HL> for each dimension to a regular array declaration. For
        instance, to make a 2-dimensional int array, add another set of brackets
        to the declaration, such as <HL>int[][]</HL>. This continues for
        3-dimensional arrays <HL>(int[][][])</HL> and so forth.
      </Para>
      <Syntax title="Syntax" code={syntax} />;
      <Syntax
        src="44 Two Dimension Arrays in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default TwoDimensionArraysInJava;

const syntax = `
Datatype variable_name [ ] [ ] ;
(or)
Datatype [ ][ ] variable_name ;
`;
