import { List, Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const EnhancedForLoopInJava = () => {
  return (
    <>
      <Title>Enhanced for loop in Java</Title>
      <Para>
        The enhanced style for can only cycle through an array sequentially,
        from start to finish.It is also known as the enhanced for loop. The
        enhanced for loop was introduced in Java 5 as a simpler way to iterate
        through all the elements of a Collection (Collections are not covered in
        these pages). It can also be used for arrays, as in the above example,
        but this is not the original purpose.
      </Para>
      <Para>
        Enhanced for loops are simple but inflexible. They can be used when you
        wish to step through the elements of the array in first-to-last order,
        and you do not need to know the index of the current element.
      </Para>
      <Syntax title="Syntax" code={syntax} />
      <List
        items={[
          "Datatype : The Datatype of the array/collection",
          "Item : Each item of array/collection is assigned to this variable",
          "Array : An array or a collection",
        ]}
      />

      <Syntax
        src="23 Enhanced for loop in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default EnhancedForLoopInJava;

const syntax = `
for( Datatype item : array )
{
    // body of loop;
}
`;
