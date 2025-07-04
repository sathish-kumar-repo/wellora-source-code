import { HL, List, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const ArrayInJava = () => {
  return (
    <>
      <Title>Array in Java</Title>
      <Para>
        An array is a collection of elements of the same type placed in
        contiguous memory locations that can be individually referenced by using
        an index to a unique identifier.
      </Para>
      <List
        items={[
          <>
            <HL>Array Type :</HL> Type of the array. This can be primitive (int,
            long, byte) or Objects (String, MyObject, etc).
          </>,
          <>
            <HL>Index :</HL> Index refers to the position of a certain Object in
            an array.
          </>,
          <>
            <HL>Length :</HL> Every array, when being created, needs a set
            length specified. This is either done when creating an empty array
            (new int[3]) or implied when specifying values {`({(1, 2, 3)})`}.
          </>,
        ]}
      />
      <Syntax title="Syntax" code={syntax} />
      <Syntax title="Example" code={eg} />
      <Syntax
        src="39 Array in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default ArrayInJava;

const syntax = `
Datatype variable_name [ ] ;
(or)
Datatype [ ] variable_name ;
`;

const eg = `
int [ ] array = new int [ 5 ] ;
`;
