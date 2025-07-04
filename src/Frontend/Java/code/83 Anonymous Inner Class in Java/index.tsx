import { Para, Syntax, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const AnonymousInnerClassInJava = () => {
  return (
    <>
      <Title>Anonymous Inner Class in Java</Title>
      <Para>
        An anonymous it is an inner class without a name and for which only a
        single object is created. An anonymous inner class can be useful when
        making an instance of an object with certain “extras” such as overriding
        methods of a class or interface, without having to actually subclass a
        class.
      </Para>
      <Para>
        Anonymous inner classes are useful when a class needs to be created and
        used only once. They are particularly useful for providing
        implementations of interfaces or abstract classes. They allow for the
        creation of an object with a single defined behavior without the need to
        create a separate class.
      </Para>
      <Syntax
        src="83 Anonymous Inner Class in Java/App.java"
        customDomain={domain}
        language="java"
      />
    </>
  );
};

export default AnonymousInnerClassInJava;
