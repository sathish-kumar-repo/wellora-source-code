import { H2, Media, Para, Space, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const ClassAndObjectInJava = () => {
  return (
    <>
      <Title>Class & object in Java</Title>
      <Para>
        A class is often defined as the blueprint or template for an object. We
        can create multiple objects from a class.
      </Para>
      <Para>
        An object is an identifiable entity with some characteristics, state and
        behaviour.
      </Para>
      <Para>
        Memory is allocated when we create the objects of a class type. A class
        contains properties and methods to define the state and behaviour of its
        object. It defines the data and the methods that act upon that data.
      </Para>
      <Para>
        <b>Example :</b> A dog has states - color, name, breed as well as
        behaviors – wagging the tail, barking, eating. An object is an instance
        of a class.
      </Para>
      <H2>Syntax Of Class :</H2>
      <Syntax title="Syntax" code={syntax1} />
      <H2>Syntax Of Object :</H2>
      <Syntax title="Syntax" code={syntax2} />
      <H2>Reference</H2>
      <Media src="62 Class & object in Java/img.jpg" customDomain={domain} />
      <Space sT={20} />
      <Syntax
        src="62 Class & object in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default ClassAndObjectInJava;

const syntax1 = `
class class_name
{
    Variables ;
    Methods ;
}
`;
const syntax2 = `
Class_Name ReferenceVariable ( or ) Object = new Class_Name ( ) ;
`;
