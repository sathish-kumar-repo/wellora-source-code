import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const Jagged_arrayInJava = () => {
  return (
    <>
      <Title>Jagged-Array in Java</Title>
      <Para>
        A jagged array is an array of arrays such that member arrays can be of
        different row sizes and column sizes. Jagged subarrays may also be null.
        For instance, the following code declares and populates a two
        dimensional int array whose first subarray is of four length, second
        subarray is of three length, and the last subarray is a fours length
        array:
      </Para>
      <Syntax title="Example" code={eg} />
      <Syntax
        src="45 Jagged-Array in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default Jagged_arrayInJava;

const eg = `
int [ ] [ ] a = { { 10,20,30,40 } , { 10,20,30 } , { 10,20,30,50 } } ;
`;
