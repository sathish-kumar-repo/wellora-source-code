import {
  H1,
  H2,
  List,
  Note,
  Para,
  Syntax,
  Title,
} from "../../../../Backend/UI";
import { domain } from "../../content";

const TypeCastingInJava = () => {
  return (
    <>
      <Title>Type Casting in Java</Title>
      <Para>
        Type casting is a way of converting data from one data type to another
        data type. This process of data conversion is also known as type
        conversion.
      </Para>
      <Para>There are two types of casting in Java as follows:</Para>
      <List
        items={[
          "Widening Casting (automatically)",
          "Narrowing Casting (manually)",
        ]}
      />
      <H1>1. Widening Casting (automatically)</H1>
      <Para>
        This type of casting takes place when two data types are automatically
        converted. It is also known as Implicit Conversion. This involves the
        conversion of a smaller data type to the larger type size.
      </Para>
      <Para>{`byte -> short -> char -> int -> long -> float -> double`}</Para>
      <Syntax
        src="05 Type Casting in Java\1. Widening Casting (Implicit)/App.java"
        customDomain={domain}
        language="java"
      />

      <H1>2. Narrowing Casting (manually)</H1>
      <Para>
        if you want to assign a value of larger data type to a smaller data
        type, you can perform Explicit type casting or narrowing. This is useful
        for incompatible data types where automatic conversion cannot be done.
      </Para>
      <Para>{`double -> float -> long -> int -> char -> short -> byte`}</Para>

      <Syntax
        src="05 Type Casting in Java\2. Narrowing Casting (Explicit)/App.java"
        customDomain={domain}
        language="java"
      />
      <Note>Without casting, a / b would give 2, since both are integers.</Note>

      <H2>Working Source code</H2>
      <Syntax
        src="05 Type Casting in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default TypeCastingInJava;
