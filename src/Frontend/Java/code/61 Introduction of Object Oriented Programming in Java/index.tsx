import { H1, HL, List, Media, Para, Title } from "../../../../Backend/UI";
import { domain } from "../../content";

const IntroductionOfObjectOrientedProgrammingInJava = () => {
  return (
    <>
      <Title>Introduction of Object Oriented Programming in Java</Title>
      <Para>
        OOP stands for <HL>Object-Oriented Programming</HL>.. The popular
        object-oriented languages are <HL>Java, C#, PHP, Python, C++,</HL> etc.
      </Para>
      <Para>
        The main aim of object-oriented programming is to implement real-world
        entities, for example,{" "}
        <HL>object, classes, abstraction, inheritance, polymorphism</HL>, etc.
        Object-Oriented Programming is a methodology or paradigm to design a
        program using classes and objects. It simplifies software development
        and maintenance by providing some concepts.
      </Para>
      <List
        items={[
          <>
            <HL>Object:</HL> Any entity that has state and behaviour is known as
            an object.
          </>,
          <>
            <HL>Class:</HL> Collection of objects is called class. It is a
            logical entity.
          </>,
          <>
            <HL>Inheritance:</HL> When one object acquires all the properties
            and behaviours of a parent object, it is known as inheritance.
          </>,
          <>
            <HL>Polymorphism:</HL> If one task is performed in different ways,
            it is known as polymorphism.
          </>,
          <>
            <HL>Abstraction:</HL> Hiding internal details and showing
            functionality is known as abstraction.
          </>,
          <>
            <HL>Encapsulation:</HL> Binding (or wrapping) code and data together
            into a single unit are known as encapsulation.
          </>,
        ]}
      />
      <H1>Reference</H1>
      <Media
        sequence={{
          start: 1,
          end: 7,
          base: "61 Introduction of Object Oriented Programming in Java/",
          ext: "jpg",
        }}
        customDomain={domain}
      />
    </>
  );
};

export default IntroductionOfObjectOrientedProgrammingInJava;
